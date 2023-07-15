import { makeAutoObservable, runInAction } from "mobx";
import { Cliente, NewCliente } from "../interfaces/appInterfaces";
import * as yup from 'yup';
import { Alert } from "react-native";
import { VALIDATION_STRINGS } from "../messages/appMessages";
import {
    getDbConnection,
    initDatabase,
    insertCliente,
    selectClienteById,
    selectClientes,
    deleteClienteById,
    updateCliente
} from "../db/database";

class SharedStateStore {
    idCliente = 0;
    nombre = '';
    telefono = '';
    correo = '';
    empresa = '';
    alerta = false;
    cliente: NewCliente | undefined;
    clienteById: Cliente | null = null;
    clientes: Cliente[] = [];
    consultarAPI: boolean = false;
    isSaved: boolean = false;

    constructor() {
        initDatabase();
        makeAutoObservable(this);
    }

    clearCliente() {
        this.setIdCliente(0);
        this.setNombre('');
        this.setTelefono('');
        this.setCorreo('');
        this.setEmpresa('');
    }

    setIdCliente(id: number) {
        this.idCliente = id;
    }

    setNombre(nombre: string) {
        this.nombre = nombre;
    }

    setTelefono(telefono: string) {
        this.telefono = telefono;
    }

    setCorreo(correo: string) {
        this.correo = correo;
    }

    setEmpresa(empresa: string) {
        this.empresa = empresa;
    }

    setAlerta(alerta: boolean) {
        this.alerta = alerta;
    }

    setIsSaved(isSaved: boolean) {
        this.isSaved = isSaved;
    }

    setCliente(cliente: NewCliente): void {
        this.cliente = cliente
    }

    setClienteById(cliente: Cliente | null): void {
        this.clienteById = cliente
    }

    setClientes(clientes: Cliente[]): void {
        this.clientes = clientes
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
        empresa: yup.string()
            .required(VALIDATION_STRINGS.empresaRequired)
            .min(2, VALIDATION_STRINGS.empresaMinLength)
            .max(100, VALIDATION_STRINGS.empresaMaxLength),
    });

    validateCliente() {
        const cliente = {
            nombre: this.nombre,
            telefono: this.telefono,
            correo: this.correo,
            empresa: this.empresa,
        };

        try {
            this.validationSchema.validateSync(cliente, { abortEarly: false });
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

    fetchClientes = async () => {
        try {
            const db = await getDbConnection();
            const clientes = await selectClientes(db);
            runInAction(() => {
                this.setClientes(clientes);
            });
        } catch (error) {
            console.error(error);
        }
    }

    fetchClienteById = async (id: number) => {
        try {
            const db = await getDbConnection();
            const cliente = await selectClienteById(db, id);
            runInAction(() => {
                return this.setClienteById(cliente);
            });
        } catch (error) {
            console.error(error);
        }
    }

    saveCliente = async () => {
        if (!this.validateCliente()) {
            this.setIsSaved(false);
            return;
        }

        const newCliente = {
            nombre: this.nombre,
            telefono: this.telefono,
            correo: this.correo,
            empresa: this.empresa
        }

        try {
            const db = await getDbConnection();
            await insertCliente(db, newCliente);
            runInAction(() => {
                this.setIsSaved(true);
                this.fetchClientes();
            });
        } catch (error) {
            console.error(error);
        }
    }

    updateCliente = async(id: number) => {
        if (!this.validateCliente() || !id) {
            this.setIsSaved(false);
            return;
        }

        const updatedCliente = {
            id: id,
            nombre: this.nombre,
            telefono: this.telefono,
            correo: this.correo,
            empresa: this.empresa
        };

        try {
            const db = await getDbConnection();
            await updateCliente(db, updatedCliente);
            runInAction(() => {
                this.setIsSaved(true);
                this.fetchClientes();
            });
        } catch (error) {
            console.log(error);
        }
    }

    deleteClienteById = async (id: number) => {
        try {
            if (!id) return;

            const db = await getDbConnection();
            await deleteClienteById(db, id);
            runInAction(() => {
                this.fetchClientes();
            });
        } catch (error) {
            console.error(error);
        }
    }
}

const sharedStateStore = new SharedStateStore();
export default sharedStateStore;