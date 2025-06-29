import { closeHandler } from "./handlers/closeHandler";
import { errorHandler } from "./handlers/errorHandler";
import { messageHandler } from "./handlers/messageHandler";
import { openHandler } from "./handlers/openHandler";
import { WebsocketHandler } from "./types";

type WebSocketEventBase = 'message' | 'open' | 'close' | 'error';

type WebSocketEvent = WebSocketEventBase | (string & {});

export default class EasyWebsocket {
    url: string;
    protocols: string | string[] | undefined;
    ws!: WebSocket;
    handlers?: { [key: string]: WebsocketHandler<any> };
    reconnect: boolean;
    constructor(url: string, reconnect?: boolean, protocols?: string | string[]) {
        this.url = url;
        this.protocols = protocols;
        this.reconnect = reconnect || false;
        this.open();
    }

    open(): void {
        this.ws = new WebSocket(this.url, this.protocols);
        this.ws.onmessage = messageHandler(this);
        this.ws.onclose = closeHandler(this);
        this.ws.onopen = openHandler(this);
        this.ws.onerror = errorHandler(this);
    }

    /**
     * Extends the onmessage event to handle custom message events.
     * @param event 
     * @param callback 
     */
    on<T extends any, E extends WebSocketEvent = WebSocketEvent>(event: E, callback: WebsocketHandler<T>) {
        if (!this.handlers) {
            this.handlers = {};
            this.handlers[event] = callback;
            return
        }
        if (this.handlers[event]) {
            console.warn(`Event ${event} already exists. Skipping.`);
            return;
        }
        this.handlers[event] = callback;
    }
}