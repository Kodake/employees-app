import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { List, Headline, Button, FAB } from 'react-native-paper';
import globalStyles from '../styles/global';
import { styles } from './InicioStyles';
import { observer } from 'mobx-react';
import store from '../store/sharedStateStore';
import { Cliente, Props } from '../interfaces/appInterfaces';
import { CLIENT_STRINGS } from '../messages/appMessages';

const Inicio: React.FC<Props> = observer(({ navigation }) => {

  useEffect(() => {
    store.fetchClientes();
  }, [])


  const handleNavigateNewCliente = () => {
    navigation.navigate('NuevoCliente');
  }

  const handleFetchCliente = async (id?: number) => {
    if (id) {
      await store.fetchClienteById(id);
      store.clearCliente();
      navigation.navigate('DetallesCliente');
    }
  };

  return (
    <View style={globalStyles.contenedor}>
      <Button
        style={styles.boton}
        icon="plus"
        mode="contained"
        onPress={handleNavigateNewCliente}
      >
        {CLIENT_STRINGS.newClient}
      </Button>

      <Headline style={globalStyles.titulo}>
        {store.clientes.length > 0 ? CLIENT_STRINGS.clients : CLIENT_STRINGS.noClientsYet}
      </Headline>

      <FlatList
        data={store.clientes}
        keyExtractor={(cliente: Cliente) => cliente.id.toString()}
        renderItem={({ item }: { item: Cliente }) => (
          <List.Item
            title={item.nombre}
            description={item.empresa}
            onPress={() => handleFetchCliente(item.id)}
          />
        )}
      />

      <FAB
        color='white'
        icon="plus"
        style={styles.fab}
        onPress={handleNavigateNewCliente}
      />
    </View>
  );
});

export default Inicio;
