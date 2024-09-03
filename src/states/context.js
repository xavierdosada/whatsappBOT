import { startState } from "./startState.js";

// Clase Contexto
export class handlersStates {
    // Mapa estático para almacenar instancias por número de WhatsApp
    static instances = new Map();

    // Constructor privado para evitar instanciación externa
    constructor(whatsappNumber) {
        if(!whatsappNumber) throw new Error('whatsappNumber is missing')
        if (handlersStates.instances.has(whatsappNumber)) {
            return handlersStates.instances.get(whatsappNumber); // Retorna la instancia existente
        }
        
        this.whatsappNumber = whatsappNumber;
        this.state = new startState(); // Estado inicial
        
        handlersStates.instances.set(whatsappNumber, this); // Guarda la instancia en el mapa
    }

    deleteInstance(whatsappNumber){
        if(handlersStates.instances.has(whatsappNumber)){
            handlersStates.instances.delete(whatsappNumber)
        }
    }

    setState(state) {
        this.state = state;
    }

    handle(message, client) {
        this.state.handle(message, client);
    }

    // Métodos que delegan al estado actual
    schedule() {
        this.setState(this.state.schedule());
    }
}