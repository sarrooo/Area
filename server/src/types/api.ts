export type TrireaTriggerInput = {
    id?: number;
    value?: string;
    trireaId: number;
    triggerInputTypeId: number;
}

export type TriggerInputType = {
    id?: number;
    name: string;
    type: string;
    description?: string
    regex?: string;
    mandatory: boolean;
    triggerId: number;
}

export type TrireaReactionInput = {
    id?: number;
    value?: string;
    linkedToId?: number;
    trireaId: number;
    reactionInputTypeId: number;
}

export type ReactionInputType = {
    id?: number;
    name: string;
    type: string;
    description?: string;
    regex?: string;
    mandatory: boolean;
    reactionId: number;
}

export type TriggerOutput = {
    id: number | undefined;
    triggerId: number;
    name: string;
    description: string | undefined;
    type: string;
    value: string | number | boolean | undefined;
}

export type TriggerOutputType = {
    id?: number;
    name: string;
    type: string;
    description?: string;
    triggerId: number;
}

export type Trigger = {
    id?: number;
    name: string;
    description?: string;
    inputs?: TriggerInputType[]
    outputs?: TriggerOutputType[]
    serviceId: number;
}

export type Reaction = {
    id?: number;
    name: string;
    description?: string;
    inputs?: ReactionInputType[]
    serviceId: number;
}

export type Service = {
    id?: number;
    name: string;
    description?: string;
    image?: string;
    triggers?: Trigger[]
    reactions?: Reaction[]
    requiredSubcription: boolean;
    subscribed?: boolean;
}

export type Trirea = {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
    prevTriggerData?: string;
    enabled: boolean;
    userId: number;
    triggerId: number;
    reactionId: number;
    trigger?: Trigger;
    reaction?: Reaction;
}

export type searchMax = {
    max?: number;
}