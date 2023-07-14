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
  // db.close();
}

export const insertCliente = (db: SQLiteDatabase, cliente: NewCliente) => {
  const insertQuery = `INSERT INTO CLIENTES (nombre, telefono, correo, empresa) values ('${cliente.nombre}', '${cliente.telefono}', '${cliente.correo}', '${cliente.empresa}')`;
  return db.executeSql(insertQuery);
}

export async function selectClientes(db: SQLiteDatabase) {
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