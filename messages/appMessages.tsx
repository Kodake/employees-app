export const CLIENT_STRINGS = {
    clients: 'Clientes',
    noClientsYet: 'Aún no hay clientes',
    newClient: 'Nuevo cliente',
    editClient: 'Editar cliente',
    updateClient: 'Actualizar cliente',
    deleteClient: 'Eliminar cliente',
    clientDetails: 'Detalles cliente',
    title: 'Añadir nuevo cliente',
    nameLabel: 'Nombre',
    namePlaceholder: 'Escribe tu nombre',
    phoneLabel: 'Telefono',
    phonePlaceholder: '9999999999',
    emailLabel: 'Correo',
    emailPlaceholder: 'correo@correo.com',
    companyLabel: 'Empresa',
    companyPlaceholder: 'Escribe la empresa donde trabajas',
    dateLabel: 'Fecha',
    hourLabel: 'Hora',
    saveButton: 'Guardar cliente'
};

export const VALIDATION_STRINGS = {
    validationError: 'Error de validación',
    correoExists: 'El correo ya existe',
    correoExistsForAnotherCliente: 'El correo ya existe para otro cliente',
    nombreRequired: 'El nombre es obligatorio',
    nombreMinLength: 'El nombre debe tener al menos 2 caracteres',
    nombreMaxLength: 'El nombre puede tener como máximo 50 caracteres',
    telefonoInvalid: 'Teléfono inválido',
    telefonoRequired: 'El teléfono es obligatorio',
    telefonoLength: 'El teléfono debe tener exactamente 10 caracteres',
    correoInvalid: 'Correo electrónico inválido',
    correoRequired: 'El correo es obligatorio',
    empresaRequired: 'La empresa es obligatoria',
    empresaMinLength: 'La empresa debe tener al menos 2 caracteres',
    empresaMaxLength: 'La empresa puede tener como máximo 50 caracteres',
};

export const CONFIRMATION_MESSAGES = {
    deleteConfirmation: '¿Deseas eliminar este cliente?',
    deleteConfirmationDescription: 'Un cliente eliminado no se puede recuperar',
    deleteConfirmationYes: 'Si, eliminar',
    deleteConfirmationCancel: 'Cancelar',
};

export const NOTIFICATION_STRINGS = {
    notificationChannel: 'default',
    notificationChannelName: 'default channel',
    notificationTitle: 'Appointment App',
    notificationBodyOnSave: '¡Cliente agregado satisfactoriamente!',
    notificationBodyOnUpdate: '¡Cliente actualizado satisfactoriamente!',
    notificationBodyOnDelete: '¡Cliente eliminado satisfactoriamente!'
};
