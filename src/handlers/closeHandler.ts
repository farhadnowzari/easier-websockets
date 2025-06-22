import EasyWebsocket from "../EasyWebsocket";

const closeHandler = (ews: EasyWebsocket): (event: CloseEvent) => void => {
    return (event: CloseEvent): void => {
        if (ews.reconnect) {
            ews.open();
        }
        if (ews.handlers?.['close']) {
            ews.handlers['close'](event);
            return;
        }
        console.info(`WebSocket closed: ${event.code} - ${event.reason}`);
    }
}

export { closeHandler };