import React, { useEffect } from 'react';
import { View } from 'react-native';
import { TextInput, Headline, Button } from 'react-native-paper';
import globalStyles from '../styles/global';
import { styles } from '../styles/NuevoEmpleadoStyles';
import store from '../store/sharedStateStore';
import { observer } from 'mobx-react';
import { Props } from '../interfaces/appInterfaces';
import { EMPLOYEE_STRINGS } from '../messages/appMessages';
import DatePicker from 'react-native-date-picker';

const EditarEmpleado: React.FC<Props> = observer(({ navigation }) => {

  useEffect(() => {
    if (store.empleadoById) {
      store.setIdEmpleado(store.empleadoById.id || 0);
      store.setNombre(store.empleadoById.nombre || '');
      store.setTelefono(store.empleadoById.telefono || '');
      store.setCorreo(store.empleadoById.correo || '');
      store.setPosicion(store.empleadoById.posicion || '');
      store.setFecha(store.empleadoById.fecha || new Date());
    }
  }, [store.empleadoById]);

  const handleUpdateEmpleado = async (id?: number) => {
    store.setIdEmpleado(store.idEmpleado)
    store.setNombre(store.nombre);
    store.setTelefono(store.telefono);
    store.setCorreo(store.correo);
    store.setPosicion(store.posicion);
    store.setFecha(store.fecha);

    await store.updateEmpleado(id!);

    if (store.isSaved) {
      store.clearEmpleado();
      navigation.navigate('Inicio');
    }
  };

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>{EMPLOYEE_STRINGS.editEmployee}</Headline>

      <TextInput
        label={EMPLOYEE_STRINGS.nameLabel}
        placeholder={EMPLOYEE_STRINGS.namePlaceholder}
        onChangeText={(texto) => store.setNombre(texto)}
        value={store.nombre}
        style={styles.input}
      />

      <TextInput
        label={EMPLOYEE_STRINGS.phoneLabel}
        placeholder={EMPLOYEE_STRINGS.phonePlaceholder}
        onChangeText={(texto) => store.setTelefono(texto)}
        value={store.telefono}
        style={styles.input}
      />

      <TextInput
        label={EMPLOYEE_STRINGS.emailLabel}
        placeholder={EMPLOYEE_STRINGS.emailPlaceholder}
        onChangeText={(texto) => store.setCorreo(texto)}
        value={store.correo}
        style={styles.input}
      />

      <TextInput
        label={EMPLOYEE_STRINGS.positionLabel}
        placeholder={EMPLOYEE_STRINGS.positionPlaceholder}
        onChangeText={(texto) => store.setPosicion(texto)}
        value={store.posicion}
        style={styles.input}
      />

      <Button style={styles.picker} onPress={() => store.setDateOpen(true)}>{EMPLOYEE_STRINGS.dateLabel}
        <DatePicker
          modal
          mode='date'
          locale='es_ES'
          open={store.dateOpen}
          date={new Date(store.fecha)}
          onConfirm={(date) => {
            store.setDateOpen(false)
            store.setFecha(date)
          }}
          onCancel={() => {
            store.setDateOpen(false)
          }}
        />
      </Button>

      <Button
        style={styles.boton}
        icon="content-save"
        mode="contained"
        onPress={() => handleUpdateEmpleado(store.empleadoById?.id)}
      >
        {EMPLOYEE_STRINGS.updateEmployee}
      </Button>
    </View>
  );
});

export default EditarEmpleado;
