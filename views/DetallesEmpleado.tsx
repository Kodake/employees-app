import React from 'react';
import { View, Alert } from 'react-native';
import { Headline, Text, Subheading, Button, FAB } from 'react-native-paper';
import globalStyles from '../styles/global';
import { styles } from '../styles/DetallesEmpleadoStyles';
import store from '../store/sharedStateStore';
import { Props } from '../interfaces/appInterfaces';
import { EMPLOYEE_STRINGS, CONFIRMATION_MESSAGES } from '../messages/appMessages';
import moment from 'moment';

const DetallesEmpleado: React.FC<Props> = ({ navigation }) => {

  const handleConfirmation = () => {
    Alert.alert(
      CONFIRMATION_MESSAGES.deleteConfirmation,
      CONFIRMATION_MESSAGES.deleteConfirmationDescription,
      [
        { text: CONFIRMATION_MESSAGES.deleteConfirmationYes, onPress: () => handleDeleteEmployee(store.empleadoById?.id) },
        { text: CONFIRMATION_MESSAGES.deleteConfirmationCancel, style: 'cancel' },
      ],
    );
  };

  const handleDeleteEmployee = async (id?: number) => {
    if (id) {
      await store.deleteEmpleadoById(id);
      navigation.navigate('Inicio');
    }
  };

  const handleFetchEmpleado = async (id?: number) => {
    if (id) {
      await store.fetchEmpleadoById(id);
      navigation.navigate('EditarEmpleado');
    }
  };

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>{store.empleadoById?.nombre}</Headline>
      <Text style={styles.texto}>
        {EMPLOYEE_STRINGS.positionLabel}: <Subheading>{store.empleadoById?.posicion}</Subheading>
      </Text>
      <Text style={styles.texto}>
        {EMPLOYEE_STRINGS.emailLabel}: <Subheading>{store.empleadoById?.correo}</Subheading>
      </Text>
      <Text style={styles.texto}>
        {EMPLOYEE_STRINGS.phoneLabel}: <Subheading>{store.empleadoById?.telefono}</Subheading>
      </Text>
      <Text style={styles.texto}>
        {EMPLOYEE_STRINGS.dateLabel}: <Subheading>{moment(store.empleadoById?.fecha).format("DD/MM/YYYY")}</Subheading>
      </Text>

      <Button
        icon="close"
        mode="contained"
        style={styles.boton}
        onPress={handleConfirmation}>
        {EMPLOYEE_STRINGS.deleteEmployee}
      </Button>

      <FAB
        color='white'
        icon="pencil"
        style={globalStyles.fab}
        onPress={() => handleFetchEmpleado(store.empleadoById?.id)}
      />
    </View>
  );
};

export default DetallesEmpleado;
