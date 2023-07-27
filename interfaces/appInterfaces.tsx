import { NavigationProp } from "@react-navigation/native";

export interface Props {
    navigation: NavigationProp<any>;
}

export interface Cliente {
    id: number;
    nombre: string;
    telefono: string;
    correo: string;
    empresa: string;
    fecha: Date;
}

export interface NewCliente {
    nombre: string;
    telefono: string;
    correo: string;
    empresa: string;
    fecha: Date;
}