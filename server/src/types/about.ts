export type Server = {
    current_time: number;
    services: {name: string, triggers: {name: string, description: string | null}[], reactions: {name: string, description: string | null}[]}[]
}

export type Client = {
    host: string;
}
