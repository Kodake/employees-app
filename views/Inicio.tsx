import React, { useEffect } from 'react';
import { Alert, FlatList, SafeAreaView, View } from 'react-native';
import { List, Headline, Button, FAB, Divider } from 'react-native-paper';
import globalStyles from '../styles/global';
import { styles } from '../styles/InicioStyles';
import { observer } from 'mobx-react';
import store from '../store/sharedStateStore';
import { Empleado, Props } from '../interfaces/appInterfaces';
import { CONFIRMATION_MESSAGES, EMPLOYEE_STRINGS } from '../messages/appMessages';

const Inicio: React.FC<Props> = observer(({ navigation }) => {

  useEffect(() => {
    store.fetchEmpleados();
  }, [])


  const handleNavigateNewEmpleado = () => {
    navigation.navigate('NuevoEmpleado');
  }

  const handleFetchEmpleado = async (id?: number) => {
    if (id) {
      await store.fetchEmpleadoById(id);
      store.clearEmpleado();
      navigation.navigate('DetallesEmpleado');
    }
  };

  const handleConfirmation = (id: number) => {
    store.setIdEmpleado(id);

    Alert.alert(
      CONFIRMATION_MESSAGES.deleteConfirmation,
      CONFIRMATION_MESSAGES.deleteConfirmationDescription,
      [
        { text: CONFIRMATION_MESSAGES.deleteConfirmationYes, onPress: () => handleDeleteEmployee(store.idEmpleado) },
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

  const itemSeparator = () => {
    return (
      <Divider bold />
    )
  }

  const listEmptyMessage = () => {
    return (
      <Headline style={styles.listado}>
        {EMPLOYEE_STRINGS.noEmployeesYet}
      </Headline>
    )
  }

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>
        {EMPLOYEE_STRINGS.employees}
      </Headline>

      <Button
        style={styles.boton}
        icon="plus"
        mode="contained"
        onPress={handleNavigateNewEmpleado}
      >
        {EMPLOYEE_STRINGS.newEmployee}
      </Button>

      <SafeAreaView style={styles.safeArea}>
        <FlatList
          data={store.empleados}
          keyExtractor={(empleado: Empleado) => empleado.id.toString()}
          ListEmptyComponent={listEmptyMessage}
          ItemSeparatorComponent={itemSeparator}
          renderItem={({ item }: { item: Empleado }) => (
            <List.Item
              title={item.nombre}
              description={item.posicion}
              onPress={() => handleFetchEmpleado(item.id)}
              onLongPress={() => handleConfirmation(item.id)}
            />
          )}
        />
      </SafeAreaView>

      <FAB
        color='white'
        icon="plus"
        style={styles.fab}
        onPress={handleNavigateNewEmpleado}
      />
    </View>
  );
});

export default Inicio;
