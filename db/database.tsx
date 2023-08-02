import { ResultSet, SQLiteDatabase, enablePromise, openDatabase } from 'react-native-sqlite-storage';
import { NewEmpleado, Empleado } from '../interfaces/appInterfaces';

enablePromise(true);

const DATABASE_NAME = 'Company.db';

export async function getDbConnection() {
  const db = await openDatabase({ name: DATABASE_NAME, location: 'default' });
  return db;
}

export async function createTables(db: SQLiteDatabase | null) {
  const query = `CREATE TABLE IF NOT EXISTS EMPLEADOS(id INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(50),
  telefono VARCHAR(10), correo VARCHAR(50), posicion VARCHAR(50), fecha DATE)`;
  return await db?.executeSql(query);
}

export async function initDatabase() {
  const db = await getDbConnection();
  await createTables(db);
}

export const validateExistingCorreo = async (db: SQLiteDatabase, correo: string): Promise<Empleado | null> => {
  const selectQuery = `SELECT id, nombre, telefono, correo, posicion FROM EMPLEADOS WHERE correo = ?`;
  const results = await db.executeSql(selectQuery, [correo]);

  if (results.length > 0 && results[0].rows.length > 0) {
    return results[0].rows.item(0);
  }

  return null;
}

export const selectEmpleados = async (db: SQLiteDatabase) => {
  const empleados: Empleado[] = [];
  const selectQuery = `SELECT id, nombre, telefono, correo, posicion, fecha FROM EMPLEADOS`;
  const results = await db.executeSql(selectQuery);

  results.forEach((resultSet: ResultSet) => {
    for (let index = 0; index < resultSet.rows.length; index++) {
      empleados.push(resultSet.rows.item(index));
    }
  });

  return empleados;
}

export const selectEmpleadoById = async (db: SQLiteDatabase, id: number) => {
  let empleado: Empleado | null = null;
  const selectQuery = `SELECT id, nombre, telefono, correo, posicion, fecha FROM EMPLEADOS WHERE id = ?`;
  const results = await db.executeSql(selectQuery, [id]);

  if (results.length > 0 && results[0].rows.length > 0) {
    empleado = results[0].rows.item(0);
    return empleado;
  }

  return null;
}

export const insertEmpleado = async (db: SQLiteDatabase, empleado: NewEmpleado) => {
  const insertQuery = `
    INSERT INTO EMPLEADOS (nombre, telefono, correo, posicion, fecha)
    VALUES (?, ?, ?, ?, ?)
  `;
  const { nombre, telefono, correo, posicion, fecha } = empleado;
  await db.executeSql(insertQuery, [nombre, telefono, correo, posicion, fecha.toString()]);
}

export const updateEmpleado = async (db: SQLiteDatabase, empleado: Empleado) => {
  const updateQuery = `
    UPDATE EMPLEADOS
    SET nombre = ?, telefono = ?, correo = ?, posicion = ?, fecha = ?
    WHERE id = ?
  `;
  const { id, nombre, telefono, correo, posicion, fecha } = empleado;
  await db.executeSql(updateQuery, [nombre, telefono, correo, posicion, fecha.toString(), id]);
}

export const deleteEmpleadoById = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE FROM EMPLEADOS WHERE id = ?`;
  await db.executeSql(deleteQuery, [id]);
}
