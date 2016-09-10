import { Handle, EventObject } from './interfaces';
export default class Evented {
    /**
     * Emits an event, firing listeners registered for it.
     * @param event The event object to emit
     */
    emit<T extends EventObject>(data: T): void;
    /**
     * Listens for an event, calling the listener whenever the event fires.
     * @param type Event type to listen for
     * @param listener Callback to handle the event when it fires
     * @return A handle which will remove the listener when destroy is called
     */
    on(type: string, listener: (event: EventObject) => void): Handle;
}
