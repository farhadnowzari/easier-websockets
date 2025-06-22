type WebsocketHandler<T extends any> = (arg: T) => void | Promise<void>;

export type { WebsocketHandler }