export class appointmentStorage {
    // Mapa estático para almacenar instancias por número de WhatsApp
    static instances = new Map();

    // Constructor privado para evitar instanciación externa
    constructor(whatsappNumber) {
        if(!whatsappNumber) throw new Error('whatsappNumber is missing')
        if (appointmentStorage.instances.has(whatsappNumber)) {
            return appointmentStorage.instances.get(whatsappNumber); // Retorna la instancia existente
        }
        
        this.whatsappNumber = whatsappNumber;
        this.appointments = []; // Aquí guardare la lista de turnos para elegir
        
        appointmentStorage.instances.set(whatsappNumber, this); // Guarda la instancia en el mapa
    }

    // Delegar métodos de Appointments
    saveAppointments(appointments) {
        // Asegúrate de que `appointments` sea un array
        if (!Array.isArray(appointments)) {
            throw new Error('El parámetro debe ser un array');
        }

        // Aplanar el array de arrays y concatenar con `this.appointments`
        appointments.flat().forEach(appointment => this.appointments.push(appointment));
    }

    removeAppointment(appointmentId) {
        this.appointments = this.appointments.filter(app => app.id !== appointmentId);
    }

    getAppointments() {
        return this.appointments;
    }

    clearAppointments() {
        this.appointments = [];
    }
}
