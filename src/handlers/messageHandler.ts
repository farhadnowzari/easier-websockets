import EasyWebsocket from "../EasyWebsocket";

const messageHandler = (ews: EasyWebsocket): (event: MessageEvent) => Promise<void> => {
    return async (event: MessageEvent): Promise<void> => {
        const data = JSON.parse(event.data);
        if (!data.event && ews.handlers?.['message']) {
            return await ews.handlers['message'](data);
        }
        if (data.event && ews.handlers?.[data.event]) {
            return await ews.handlers[data.event](data.payload);
        }
        console.warn(`No handler found for event: ${data.event || 'message'}`);
    }
}

export { messageHandler };