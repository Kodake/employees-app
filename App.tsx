import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Inicio from './views/Inicio';
import NuevoCliente from './views/NuevoCliente';
import DetallesCliente from './views/DetallesCliente';
import EditarCliente from './views/EditarCliente';

const Stack = createNativeStackNavigator();

// Define theme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3a86ff',
    accent: '#023e8a'
  }
}

const App: React.FC = () => {
  return (
    <>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Inicio"
            screenOptions={{
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: theme.colors.primary
              },
              headerTintColor: theme.colors.surface,
              headerTitleStyle: {
                fontWeight: 'bold'
              }
            }}
          >
            <Stack.Screen
              name="Inicio"
              component={Inicio}
            />
            <Stack.Screen name="NuevoCliente" component={NuevoCliente} options={{ title: 'Nuevo Cliente' }} />
            <Stack.Screen name="EditarCliente" component={EditarCliente} options={{ title: 'Editar Cliente' }} />
            <Stack.Screen name="DetallesCliente" component={DetallesCliente} options={{ title: 'Detalles Cliente' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
}

export default App;
