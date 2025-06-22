import EasyWebsocket from "../EasyWebsocket";

const errorHandler = (ews: EasyWebsocket): (event: Event) => void => {
    return (event: Event): void => {
        if(ews.reconnect) {
            ews.open();
        }
        if (ews.handlers?.['error']) {
            ews.handlers['error'](event);
            return;
        }
        console.error("WebSocket error:", event);
    }
}

export { errorHandler };