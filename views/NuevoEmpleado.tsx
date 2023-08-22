import React, {useEffect} from 'react';
import {View} from 'react-native';
import {TextInput, Headline, Button} from 'react-native-paper';
import globalStyles from '../styles/global';
import {styles} from '../styles/NuevoEmpleadoStyles';
import store from '../store/sharedStateStore';
import {observer} from 'mobx-react';
import {Props} from '../interfaces/appInterfaces';
import {EMPLOYEE_STRINGS} from '../messages/appMessages';
import DatePicker from 'react-native-date-picker';

const NuevoEmpleado: React.FC<Props> = observer(({navigation}) => {
  useEffect(() => {
    if (store.empleado || store.empleadoById) {
      store.clearEmpleado();
    }
  }, []);

  const handleSaveEmpleado = async () => {
    await store.saveEmpleado();
    if (store.isSaved) {
      store.clearEmpleado();
      navigation.navigate('Inicio');
    }
  };

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>{EMPLOYEE_STRINGS.title}</Headline>

      <TextInput
        label={EMPLOYEE_STRINGS.nameLabel}
        placeholder={EMPLOYEE_STRINGS.namePlaceholder}
        onChangeText={texto => store.setNombre(texto)}
        style={styles.input}
        maxLength={50}
      />

      <TextInput
        keyboardType="phone-pad"
        label={EMPLOYEE_STRINGS.phoneLabel}
        placeholder={EMPLOYEE_STRINGS.phonePlaceholder}
        onChangeText={texto => store.setTelefono(texto)}
        style={styles.input}
        maxLength={10}
      />

      <TextInput
        keyboardType="email-address"
        label={EMPLOYEE_STRINGS.emailLabel}
        placeholder={EMPLOYEE_STRINGS.emailPlaceholder}
        onChangeText={texto => store.setCorreo(texto)}
        style={styles.input}
        maxLength={50}
      />

      <TextInput
        label={EMPLOYEE_STRINGS.positionLabel}
        placeholder={EMPLOYEE_STRINGS.positionPlaceholder}
        onChangeText={texto => store.setPosicion(texto)}
        style={styles.input}
        maxLength={50}
      />

      <Button textColor='white' style={styles.picker} onPress={() => store.setDateOpen(true)}>
        {EMPLOYEE_STRINGS.dateLabel}
        <DatePicker
          modal
          mode="date"
          locale="es_ES"
          open={store.dateOpen}
          date={store.fecha}
          onConfirm={date => {
            store.setDateOpen(false);
            store.setFecha(date);
          }}
          onCancel={() => {
            store.setDateOpen(false);
          }}
        />
      </Button>

      <Button
        style={styles.boton}
        icon="content-save"
        mode="contained"
        onPress={handleSaveEmpleado}>
        {EMPLOYEE_STRINGS.saveButton}
      </Button>
    </View>
  );
});

export default NuevoEmpleado;
