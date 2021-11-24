import React, { useState } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableHighlight, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import Cita from './components/Cita';
import Formulario from './components/Formulario';

const App = () => {

  const [mostrarForm, guardarMostrarForm] = useState(false);

  const [citas, setCitas] = useState([
    { id: "1", paciente: "Hook", propietario: "Juan", sintomas: "No come" },
    { id: "2", paciente: "Redux", propietario: "Vladi", sintomas: "No toma agua" },
    { id: "3", paciente: "Native", propietario: "Juana", sintomas: "No come frutas" },
    { id: "4", paciente: "VUE", propietario: "Ferro", sintomas: "No toma cerveza" },
    { id: "5", paciente: "Angular", propietario: "Jacobo", sintomas: "No come vegetales" }
  ]);

  const eliminarPaciente = id => {
    setCitas((citasActuales) => {
      return citasActuales.filter(cita => cita.id !== id)
    })
  }

  // Muestra u oculta el formulario
  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarForm);
  }

  //Ocultar el teclado
  const cerrarTeclado = () => {
    Keyboard.dismiss();
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