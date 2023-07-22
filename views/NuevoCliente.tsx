import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import {
  TextInput,
  Headline,
  Button
} from 'react-native-paper';
import globalStyles from '../styles/global';
import { styles } from '../styles/NuevoClienteStyles';
import store from '../store/sharedStateStore';
import { observer } from 'mobx-react';
import { Props } from '../interfaces/appInterfaces';
import { CLIENT_STRINGS } from '../messages/appMessages';
import DatePicker from 'react-native-date-picker'

const NuevoCliente: React.FC<Props> = observer(({ navigation }) => {
  useEffect(() => {
    if (store.cliente || store.clienteById) {
      store.clearCliente();
    }
  }, [])

  const handleSaveCliente = async () => {
    await store.saveCliente();
    if (store.isSaved) {
      store.clearCliente();
      navigation.navigate('Inicio');
    }
  };

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>Agregar Cliente</Headline>

      <TextInput
        label={CLIENT_STRINGS.nameLabel}
        placeholder={CLIENT_STRINGS.namePlaceholder}
        onChangeText={(texto) => store.setNombre(texto)}
        style={styles.input}
      />

      <TextInput
        label={CLIENT_STRINGS.phoneLabel}
        placeholder={CLIENT_STRINGS.phonePlaceholder}
        onChangeText={(texto) => store.setTelefono(texto)}
        style={styles.input}
      />

      <TextInput
        label={CLIENT_STRINGS.emailLabel}
        placeholder={CLIENT_STRINGS.emailPlaceholder}
        onChangeText={(texto) => store.setCorreo(texto)}
        style={styles.input}
      />

      <TextInput
        label={CLIENT_STRINGS.companyLabel}
        placeholder={CLIENT_STRINGS.companyPlaceholder}
        onChangeText={(texto) => store.setEmpresa(texto)}
        style={styles.input}
      />

      <Button style={styles.picker} onPress={() => store.setDateOpen(true)}>{CLIENT_STRINGS.dateLabel}
        <DatePicker
          modal
          mode='date'
          locale='es-ES'
          open={store.dateOpen}
          date={store.fecha}
          onConfirm={(date) => {
            store.setDateOpen(false)
            store.setFecha(date)
          }}
          onCancel={() => {
            store.setDateOpen(false)
          }}
        />
      </Button>

      <Button style={styles.picker} onPress={() => store.setHourOpen(true)}>{CLIENT_STRINGS.hourLabel}
        <DatePicker
          modal
          mode='time'
          locale='es-ES'
          open={store.hourOpen}
          date={store.hora}
          onConfirm={(hour) => {
            store.setHourOpen(false)
            store.setHora(hour)
          }}
          onCancel={() => {
            store.setHourOpen(false)
          }}
        />
      </Button>

      <Button
        style={styles.boton}
        icon="content-save"
        mode="contained"
        onPress={handleSaveCliente}
      >
        {CLIENT_STRINGS.saveButton}
      </Button>
    </View>
  );
});

export default NuevoCliente;
