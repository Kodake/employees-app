import { ResultSet, SQLiteDatabase, enablePromise, openDatabase } from 'react-native-sqlite-storage';
import { NewCliente, Cliente } from '../interfaces/appInterfaces';

enablePromise(true);

const DATABASE_NAME = 'Customers.db';

export async function getDbConnection() {
  const db = await openDatabase({ name: DATABASE_NAME, location: 'default' });
  return db;
}

export async function createTables(db: SQLiteDatabase | null) {
  const query = `CREATE TABLE IF NOT EXISTS Clientes(id INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(50), telefono VARCHAR(10), correo VARCHAR(50), empresa VARCHAR(50))`;
  return await db?.executeSql(query);
}

export async function initDatabase() {
  const db = await getDbConnection();
  await createTables(db);
}

export const validateExistingCorreo = async (db: SQLiteDatabase, correo: string): Promise<Cliente | null> => {
  const selectQuery = `SELECT id, nombre, telefono, correo, empresa FROM CLIENTES WHERE correo = ?`;
  const results = await db.executeSql(selectQuery, [correo]);

  if (results.length > 0 && results[0].rows.length > 0) {
    return results[0].rows.item(0);
  }

  return null;
}


export const selectClientes = async (db: SQLiteDatabase) => {
  const clientes: Cliente[] = [];
  const selectQuery = `SELECT id, nombre, telefono, correo, empresa FROM CLIENTES`;
  const results = await db.executeSql(selectQuery);

  results.forEach((resultSet: ResultSet) => {
    for (let index = 0; index < resultSet.rows.length; index++) {
      clientes.push(resultSet.rows.item(index));
    }
  });

  return clientes;
}

export const selectClienteById = async (db: SQLiteDatabase, id: number) => {
  let cliente: Cliente | null = null;
  const selectQuery = `SELECT id, nombre, telefono, correo, empresa FROM CLIENTES WHERE id = ?`;
  const results = await db.executeSql(selectQuery, [id]);

  if (results.length > 0 && results[0].rows.length > 0) {
    cliente = results[0].rows.item(0);
    return cliente;
  }

  return null;
}

export const insertCliente = async (db: SQLiteDatabase, cliente: NewCliente) => {
  const insertQuery = `
    INSERT INTO CLIENTES (nombre, telefono, correo, empresa)
    VALUES (?, ?, ?, ?)
  `;
  const { nombre, telefono, correo, empresa } = cliente;
  await db.executeSql(insertQuery, [nombre, telefono, correo, empresa]);
}

export const updateCliente = async (db: SQLiteDatabase, cliente: Cliente) => {
  const updateQuery = `
    UPDATE CLIENTES
    SET nombre = ?, telefono = ?, correo = ?, empresa = ?
    WHERE id = ?
  `;
  const { id, nombre, telefono, correo, empresa } = cliente;
  await db.executeSql(updateQuery, [nombre, telefono, correo, empresa, id]);
}


export const deleteClienteById = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE FROM CLIENTES WHERE id = ?`;
  await db.executeSql(deleteQuery, [id]);
}
