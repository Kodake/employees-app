import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { List, Headline, Button, FAB } from 'react-native-paper';
import globalStyles from '../styles/global';
import { styles } from '../styles/InicioStyles';
import { observer } from 'mobx-react';
import store from '../store/sharedStateStore';
import { Empleado, Props } from '../interfaces/appInterfaces';
import { EMPLOYEE_STRINGS } from '../messages/appMessages';

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

  return (
    <View style={globalStyles.contenedor}>
      <Button
        style={styles.boton}
        icon="plus"
        mode="contained"
        onPress={handleNavigateNewEmpleado}
      >
        {EMPLOYEE_STRINGS.newEmployee}
      </Button>

      <Headline style={globalStyles.titulo}>
        {store.empleados.length > 0 ? EMPLOYEE_STRINGS.employees : EMPLOYEE_STRINGS.noEmployeesYet}
      </Headline>

      <FlatList
        data={store.empleados}
        keyExtractor={(empleado: Empleado) => empleado.id.toString()}
        renderItem={({ item }: { item: Empleado }) => (
          <List.Item
            title={item.nombre}
            description={item.posicion}
            onPress={() => handleFetchEmpleado(item.id)}
          />
        )}
      />

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
