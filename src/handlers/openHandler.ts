import EasyWebsocket from "../EasyWebsocket";

const openHandler = (ews: EasyWebsocket): (event: Event) => void => {
    return (event: Event): void => {
        if (ews.handlers?.['open']) {
            ews.handlers['open'](event);
            return;
        }
        console.info("WebSocket connection opened.");
    };
}

export { openHandler }