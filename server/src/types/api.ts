export type TriggerInput = {
    id: number | undefined;
    trigger_id: number;
    name: string;
    description: string | undefined;
    regex: string | undefined;
    mandatory: boolean;
    type: string;
    value: string | number | boolean | undefined;
    linked: boolean;
    linked_to: number | undefined;
}

export type ReactionInput = {
    id: number | undefined;
    reaction_id: number;
    name: string;
    description: string | undefined;
    regex: string | undefined;
    mandatory: boolean;
    type: string;
    value: string | number | boolean | undefined;
    linked: boolean;
    linked_to: number | undefined;
}

export type Output = {
    id: number | undefined;
    trigger_id: number;
    name: string;
    description: string | undefined;
    type: string;
    value: string | number | boolean | undefined;
}

export type Trigger = {
    id: number | undefined;
    name: string;
    description: string | undefined;
    inputs: TriggerInput[]
    outputs: Output[]
}

export type Reaction = {
    id: number | undefined;
    name: string;
    description: string | undefined;
    inputs: ReactionInput[]
}

export type Service = {
    id: number | undefined;
    name: string;
    description: string | undefined;
    image: string | undefined;
    triggers: Trigger[]
    reactions: Reaction[]
    required_subcription: boolean;
    subscribed: boolean | undefined;
}

export type Trirea = {
    id: number | undefined;
    trigger: Trigger;
    trigger_service_name: string;
    reaction_service_name: string;
    reaction: Reaction;
    enabled: boolean;
}

export type searchMax = {
    max?: number;
}