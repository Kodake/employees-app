import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableHighlight, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import Cita from './components/Cita';
import Formulario from './components/Formulario';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {

  const [mostrarForm, guardarMostrarForm] = useState(false);
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    //Almacenar citas en storage
    const obtenerCitasStorage = async () => {
      try {
        const citasStorage = await AsyncStorage.getItem('citas');
        console.log(citasStorage);
        if (citasStorage) {
          setCitas(JSON.parse(citasStorage))
        }
      } catch (error) {
        console.log(error);
      }
    }
    obtenerCitasStorage();
  }, [])

  const eliminarPaciente = id => {

    const citasFiltradas = citas.filter(cita => cita.id !== id)
    setCitas(citasFiltradas);
    guardarCitasStorage(JSON.stringify(citasFiltradas));
  }

  //Muestra u oculta el formulario
  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarForm);
  }

  //Ocultar el teclado
  const cerrarTeclado = () => {
    Keyboard.dismiss();
  }

  //Almacenar citas en storage
  const guardarCitasStorage = async (citasJSON) => {
    try {
      console.log(citasJSON);
      await AsyncStorage.setItem('citas', citasJSON);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Administrador de Citas</Text>

        <View style={styles.viewMostrar}>
          <TouchableHighlight style={styles.btnMostrar} onPress={() => mostrarFormulario()} >
            <Text style={styles.textoMostrar}>{mostrarForm ? 'Mostrar Listado de Citas' : 'Crear Nueva Cita'}</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.contenido}>
          {mostrarForm ? (
            <>
              <View style={styles.subContenedor}>
                <Text style={styles.subTitulo}>{citas.length > 0 ? 'Administra tus citas.' : 'No hay citas disponibles, agrega una.'}</Text>
              </View>
              <Formulario
                citas={citas}
                setCitas={setCitas}
                guardarMostrarForm={guardarMostrarForm}
                guardarCitasStorage={guardarCitasStorage}
              />
            </>
          ) : (
            <>
              <View style={styles.subContenedor}>
                <Text style={styles.subTitulo}>{citas.length > 0 ? 'Administra tus citas.' : 'No hay citas disponibles, agrega una.'}</Text>
              </View>

              <FlatList
                style={styles.listado}
                data={citas}
                renderItem={({ item }) => <Cita cita={item} eliminarPaciente={eliminarPaciente} />}
                keyExtractor={cita => cita.id}
              />
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#3a86ff',
    flex: 1
  },
  subContenedor: {
    backgroundColor: '#6c757d',
    padding: 3
  },
  titulo: {
    color: '#FFF',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subTitulo: {
    color: '#FFF',
    marginTop: 3,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%'
  },
  listado: {
    flex: 1
  },
  viewMostrar: {
    marginVertical: 10,
    marginHorizontal: 10
  },
  btnMostrar: {
    padding: 10,
    backgroundColor: '#264653',
  },
  textoMostrar: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default App;