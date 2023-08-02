import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Inicio from './views/Inicio';
import NuevoEmpleado from './views/NuevoEmpleado';
import DetallesEmpleado from './views/DetallesEmpleado';
import EditarEmpleado from './views/EditarEmpleado';

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
            <Stack.Screen name="NuevoEmpleado" component={NuevoEmpleado} options={{ title: 'Nuevo Empleado' }} />
            <Stack.Screen name="EditarEmpleado" component={EditarEmpleado} options={{ title: 'Editar Empleado' }} />
            <Stack.Screen name="DetallesEmpleado" component={DetallesEmpleado} options={{ title: 'Detalles Empleado' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
}

export default App;
