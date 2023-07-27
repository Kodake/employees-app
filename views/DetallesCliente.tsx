import React from 'react';
import { View, Alert } from 'react-native';
import { Headline, Text, Subheading, Button, FAB } from 'react-native-paper';
import globalStyles from '../styles/global';
import { styles } from '../styles/DetallesClienteStyles';
import store from '../store/sharedStateStore';
import { Props } from '../interfaces/appInterfaces';
import { CLIENT_STRINGS, CONFIRMATION_MESSAGES } from '../messages/appMessages';

const DetallesCliente: React.FC<Props> = ({ navigation }) => {

  const handleConfirmation = () => {
    Alert.alert(
      CONFIRMATION_MESSAGES.deleteConfirmation,
      CONFIRMATION_MESSAGES.deleteConfirmationDescription,
      [
        { text: CONFIRMATION_MESSAGES.deleteConfirmationYes, onPress: () => handleDeleteCliente(store.clienteById?.id) },
        { text: CONFIRMATION_MESSAGES.deleteConfirmationCancel, style: 'cancel' },
      ],
    );
  };

  const handleDeleteCliente = async (id?: number) => {
    if (id) {
      await store.deleteClienteById(id);
      navigation.navigate('Inicio');
    }
  };

  const handleFetchCliente = async (id?: number) => {
    if (id) {
      await store.fetchClienteById(id);
      navigation.navigate('EditarCliente');
    }
  };

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>{store.clienteById?.nombre}</Headline>
      <Text style={styles.texto}>
        {CLIENT_STRINGS.companyLabel}: <Subheading>{store.clienteById?.empresa}</Subheading>
      </Text>
      <Text style={styles.texto}>
        {CLIENT_STRINGS.emailLabel}: <Subheading>{store.clienteById?.correo}</Subheading>
      </Text>
      <Text style={styles.texto}>
        {CLIENT_STRINGS.phoneLabel}: <Subheading>{store.clienteById?.telefono}</Subheading>
      </Text>
      <Text style={styles.texto}>
        {CLIENT_STRINGS.dateLabel}: <Subheading>{store.clienteById?.fecha.toString()}</Subheading>
      </Text>

      <Button
        icon="close"
        mode="contained"
        style={styles.boton}
        onPress={handleConfirmation}>
        {CLIENT_STRINGS.deleteClient}
      </Button>

      <FAB
        color='white'
        icon="pencil"
        style={globalStyles.fab}
        onPress={() => handleFetchCliente(store.clienteById?.id)}
      />
    </View>
  );
};

export default DetallesCliente;
