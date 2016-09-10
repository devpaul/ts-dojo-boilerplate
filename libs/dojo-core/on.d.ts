import { Handle, EventObject } from './interfaces';
import Evented from './Evented';
export interface EventCallback {
    (event: EventObject): void;
}
export interface EventEmitter {
    on(event: string, listener: EventCallback): EventEmitter;
    removeListener(event: string, listener: EventCallback): EventEmitter;
}
/**
 * Provides a normalized mechanism for dispatching events for event emitters, Evented objects, or DOM nodes.
 * @param target The target to emit the event from
 * @param event The event object to emit
 * @return Boolean indicating if preventDefault was called on the event object (only relevant for DOM events;
 *     always false for other event emitters)
 */
export declare function emit<T extends EventObject>(target: Evented | EventTarget | EventEmitter, event: T | EventObject): boolean;
/**
 * Provides a normalized mechanism for listening to events from event emitters, Evented objects, or DOM nodes.
 * @param target Target to listen for event on
 * @param type Event event type(s) to listen for; may a string or an array of strings
 * @param listener Callback to handle the event when it fires
 * @param capture Whether the listener should be registered in the capture phase (DOM events only)
 * @return A handle which will remove the listener when destroy is called
 */
export default function on(target: EventTarget, type: string | string[], listener: EventCallback, capture?: boolean): Handle;
export default function on(target: EventEmitter | Evented, type: string | string[], listener: EventCallback): Handle;
/**
 * Provides a mechanism for listening to the next occurrence of an event from event
 * emitters, Evented objects, or DOM nodes.
 * @param target Target to listen for event on
 * @param type Event event type(s) to listen for; may be a string or an array of strings
 * @param listener Callback to handle the event when it fires
 * @param capture Whether the listener should be registered in the capture phase (DOM events only)
 * @return A handle which will remove the listener when destroy is called
 */
export declare function once(target: EventTarget, type: string | string[], listener: EventCallback, capture?: boolean): Handle;
export declare function once(target: EventEmitter | Evented, type: string | string[], listener: EventCallback): Handle;
export interface PausableHandle extends Handle {
    pause(): void;
    resume(): void;
}
/**
 * Provides a mechanism for creating pausable listeners for events from event emitters, Evented objects, or DOM nodes.
 * @param target Target to listen for event on
 * @param type Event event type(s) to listen for; may a string or an array of strings
 * @param listener Callback to handle the event when it fires
 * @param capture Whether the listener should be registered in the capture phase (DOM events only)
 * @return A handle with additional pause and resume methods; the listener will never fire when paused
 */
export declare function pausable(target: EventTarget, type: string | string[], listener: EventCallback, capture?: boolean): PausableHandle;
export declare function pausable(target: EventEmitter | Evented, type: string | string[], listener: EventCallback): PausableHandle;
