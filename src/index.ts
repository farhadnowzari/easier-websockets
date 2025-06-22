import EasyWebsocket from "./EasyWebsocket";

const connections: Record<string, EasyWebsocket> = {};

const connect = (url: string, reconnect?: boolean, protocols?: string | string[]) => {
    if (connections[url]) {
        console.warn(`WebSocket connection to ${url} already exists. Returning existing connection.`);
        return connections[url];
    }
    return new EasyWebsocket(url, reconnect, protocols);
}

const disconnect = (url: string) => {
    if (!connections[url]) {
        console.warn(`No WebSocket connection found for ${url}.`);
        return;
    }
    connections[url].reconnect = false;
    connections[url].ws.close();
    delete connections[url];
    console.info(`WebSocket connection to ${url} closed.`);
}

export { connect, disconnect, connections };