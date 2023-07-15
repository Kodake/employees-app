import React, { useEffect } from 'react';
import { View } from 'react-native';
import { TextInput, Headline, Button } from 'react-native-paper';
import globalStyles from '../styles/global';
import { styles } from './NuevoClienteStyles';
import store from '../store/sharedStateStore';
import { observer } from 'mobx-react';
import { Props } from '../interfaces/appInterfaces';
import { CLIENT_STRINGS } from '../messages/appMessages';

const EditarCliente: React.FC<Props> = observer(({ navigation }) => {
  
  useEffect(() => {
    if (store.clienteById) {
      store.setIdCliente(store.clienteById.id || 0);
      store.setNombre(store.clienteById.nombre || '');
      store.setTelefono(store.clienteById.telefono || '');
      store.setCorreo(store.clienteById.correo || '');
      store.setEmpresa(store.clienteById.empresa || '');
    }
  }, [store.clienteById]);

  const handleUpdateCliente = async (id?: number) => {
    store.setIdCliente(store.idCliente)
    store.setNombre(store.nombre);
    store.setTelefono(store.telefono);
    store.setCorreo(store.correo);
    store.setEmpresa(store.empresa);

    await store.updateCliente(id!);
    if (store.isSaved) {
      store.clearCliente();
      navigation.navigate('Inicio');
    }
  };

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>{CLIENT_STRINGS.editClient}</Headline>

      <TextInput
        label={CLIENT_STRINGS.nameLabel}
        placeholder={CLIENT_STRINGS.namePlaceholder}
        onChangeText={(texto) => store.setNombre(texto)}
        value={store.nombre}
        style={styles.input}
      />

      <TextInput
        label={CLIENT_STRINGS.phoneLabel}
        placeholder={CLIENT_STRINGS.phonePlaceholder}
        onChangeText={(texto) => store.setTelefono(texto)}
        value={store.telefono}
        style={styles.input}
      />

      <TextInput
        label={CLIENT_STRINGS.emailLabel}
        placeholder={CLIENT_STRINGS.emailPlaceholder}
        onChangeText={(texto) => store.setCorreo(texto)}
        value={store.correo}
        style={styles.input}
      />

      <TextInput
        label={CLIENT_STRINGS.companyLabel}
        placeholder={CLIENT_STRINGS.companyPlaceholder}
        onChangeText={(texto) => store.setEmpresa(texto)}
        value={store.empresa}
        style={styles.input}
      />

      <Button
        style={styles.boton}
        icon="content-save"
        mode="contained"
        onPress={() => handleUpdateCliente(store.clienteById?.id)}
      >
        {CLIENT_STRINGS.updateClient}
      </Button>
    </View>
  );
});

export default EditarCliente;
