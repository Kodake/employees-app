import { makeAutoObservable, runInAction } from "mobx";
import notifee, { AndroidImportance } from '@notifee/react-native';
import { Empleado, NewEmpleado } from "../interfaces/appInterfaces";
import * as yup from 'yup';
import { Alert } from "react-native";
import { NOTIFICATION_STRINGS, VALIDATION_STRINGS } from "../messages/appMessages";
import {
    getDbConnection,
    initDatabase,
    insertEmpleado,
    selectEmpleadoById,
    selectEmpleados,
    deleteEmpleadoById,
    updateEmpleado,
    validateExistingCorreo
} from "../db/database";

class SharedStateStore {
    idEmpleado = 0;
    nombre = '';
    telefono = '';
    correo = '';
    posicion = '';
    fecha = new Date();
    empleado: NewEmpleado | undefined;
    empleadoById: Empleado | null = null;
    empleados: Empleado[] = [];
    consultarAPI: boolean = false;
    isSaved: boolean = false;
    dateOpen: boolean = false;

    constructor() {
        initDatabase();
        makeAutoObservable(this);
    }

    clearEmpleado() {
        this.setIdEmpleado(0);
        this.setNombre('');
        this.setTelefono('');
        this.setCorreo('');
        this.setPosicion('');
        this.setFecha(new Date());
    }

    setIdEmpleado(id: number) {
        this.idEmpleado = id;
    }

    setNombre(nombre: string) {
        this.nombre = nombre.trim().toUpperCase();
    }

    setTelefono(telefono: string) {
        this.telefono = telefono.trim().toUpperCase();
    }

    setCorreo(correo: string) {
        this.correo = correo.trim().toUpperCase();
    }

    setPosicion(posicion: string) {
        this.posicion = posicion.trim().toUpperCase();
    }

    setFecha(fecha: Date) {
        this.fecha = fecha;
    }

    setDateOpen(dateOpen: boolean) {
        this.dateOpen = dateOpen;
    }

    setIsSaved(isSaved: boolean) {
        this.isSaved = isSaved;
    }

    setEmpleado(empleado: NewEmpleado): void {
        this.empleado = empleado;
    }

    setEmpleadoById(empleado: Empleado | null): void {
        this.empleadoById = empleado;
    }

    setEmpleados(empleados: Empleado[]): void {
        this.empleados = empleados;
    }

    setConsultarAPI(consultarAPI: boolean): void {
        this.consultarAPI = consultarAPI;
    }

    validationSchema = yup.object().shape({
        nombre: yup.string()
            .required(VALIDATION_STRINGS.nombreRequired)
            .min(2, VALIDATION_STRINGS.nombreMinLength)
            .max(50, VALIDATION_STRINGS.nombreMaxLength),
        telefono: yup.string()
            .required(VALIDATION_STRINGS.telefonoRequired)
            .matches(/^[0-9]+$/, VALIDATION_STRINGS.telefonoInvalid)
            .length(10, VALIDATION_STRINGS.telefonoLength),
        correo: yup.string()
            .email(VALIDATION_STRINGS.correoInvalid)
            .required(VALIDATION_STRINGS.correoRequired),
        posicion: yup.string()
            .required(VALIDATION_STRINGS.posicionRequired)
            .min(2, VALIDATION_STRINGS.posicionMinLength)
            .max(100, VALIDATION_STRINGS.posicionMaxLength),
        fecha: yup.string()
            .required(VALIDATION_STRINGS.fechaRequired)
    });

    displayNotification = async (title: string, body: string) => {
        await notifee.requestPermission();

        const channelId = await notifee.createChannel({
            id: NOTIFICATION_STRINGS.notificationChannel,
            name: NOTIFICATION_STRINGS.notificationChannelName,
            sound: NOTIFICATION_STRINGS.notificationSound,
            importance: AndroidImportance.HIGH,
            vibration: true,
        });

        await notifee.displayNotification({
            id: '1',
            title: title,
            body: body,
            android: { channelId },
        });
    };

    validateEmpleado() {
        const empleado = {
            nombre: this.nombre,
            telefono: this.telefono,
            correo: this.correo,
            posicion: this.posicion,
            fecha: this.fecha
        };

        try {
            this.validationSchema.validateSync(empleado, { abortEarly: false });
            return true;
        } catch (error) {
            runInAction(() => {
                const validationError = error as yup.ValidationError;
                const errorMessage = validationError.inner.map((e) => e.message).join('\n');
                Alert.alert(VALIDATION_STRINGS.validationError, errorMessage);
            });
            return false;
        }
    }

    validateExistingCorreo = async (correo: string) => {
        try {
            const db = await getDbConnection();
            return await validateExistingCorreo(db, correo);
        } catch (error) {
            console.error(error);
        }
    }

    fetchEmpleados = async () => {
        try {
            const db = await getDbConnection();
            const empleados = await selectEmpleados(db);
            runInAction(() => {
                this.setEmpleados(empleados);
            });
        } catch (error) {
            console.error(error);
        }
    }

    fetchEmpleadoById = async (id: number) => {
        try {
            const db = await getDbConnection();
            const empleado = await selectEmpleadoById(db, id);
            runInAction(() => {
                return this.setEmpleadoById(empleado);
            });
        } catch (error) {
            console.error(error);
        }
    }

    saveEmpleado = async () => {
        if (!this.validateEmpleado()) {
            this.setIsSaved(false);
            return;
        }

        const newEmpleado = {
            nombre: this.nombre,
            telefono: this.telefono,
            correo: this.correo,
            posicion: this.posicion,
            fecha: this.fecha
        }

        try {
            const db = await getDbConnection();
            const correoExists = await validateExistingCorreo(db, newEmpleado.correo);

            if (correoExists) {
                Alert.alert(VALIDATION_STRINGS.validationError, VALIDATION_STRINGS.correoExists);
                this.setIsSaved(false);
                return;
            }

            await insertEmpleado(db, newEmpleado);

            await this.displayNotification(
                NOTIFICATION_STRINGS.notificationTitle,
                NOTIFICATION_STRINGS.notificationBodyOnSave
            );
            runInAction(() => {
                this.setIsSaved(true);
                this.fetchEmpleados();
            });
        } catch (error) {
            console.error(error);
        }
    }

    updateEmpleado = async (id: number) => {
        if (!this.validateEmpleado() || !id) {
            this.setIsSaved(false);
            return;
        }

        const updatedEmpleado = {
            id: id,
            nombre: this.nombre,
            telefono: this.telefono,
            correo: this.correo,
            posicion: this.posicion,
            fecha: this.fecha
        };

        try {
            const db = await getDbConnection();
            this.setIsSaved(false);
            const existingEmpleado = await validateExistingCorreo(db, updatedEmpleado.correo);

            if (existingEmpleado && existingEmpleado.id !== id) {
                Alert.alert(VALIDATION_STRINGS.validationError, VALIDATION_STRINGS.correoExistsForAnotherEmpleado);
                return;
            }

            await updateEmpleado(db, updatedEmpleado);

            await this.displayNotification(
                NOTIFICATION_STRINGS.notificationTitle,
                NOTIFICATION_STRINGS.notificationBodyOnUpdate
            );
            runInAction(() => {
                this.setIsSaved(true);
                this.fetchEmpleados();
            });
        } catch (error) {
            console.log(error);
        }
    }

    deleteEmpleadoById = async (id: number) => {
        try {
            if (!id) return;

            const db = await getDbConnection();
            await deleteEmpleadoById(db, id);

            await this.displayNotification(
                NOTIFICATION_STRINGS.notificationTitle,
                NOTIFICATION_STRINGS.notificationBodyOnDelete
            );
            runInAction(() => {
                this.fetchEmpleados();
            });
        } catch (error) {
            console.error(error);
        }
    }
}

const sharedStateStore = new SharedStateStore();
export default sharedStateStore;