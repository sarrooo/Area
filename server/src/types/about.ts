type Client = {
    hostname: string;
}

type Action = {
    name: string;
    description: string;
}

type Reactions = {
    name: string;
    description: string;
}

type Service = {
    name: string;
    actions: Action[];
    reactions: Reactions[];
}

type Server = {
    current_time: number;
    services: Service[];
}

export type About = {
    client: Client;
    server: Server;
}