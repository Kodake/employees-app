import { NavigationProp } from "@react-navigation/native";

export interface Props {
    navigation: NavigationProp<any>;
}

export interface Empleado {
    id: number;
    nombre: string;
    telefono: string;
    correo: string;
    posicion: string;
    fecha: Date;
}

export interface NewEmpleado {
    nombre: string;
    telefono: string;
    correo: string;
    posicion: string;
    fecha: Date;
}