// ? CREATE TRIREA FORM 1
// : Get list of possible services with triggers and reactions
type Input = {
    id: number;
    name: string;
    type: string;
    value: string | number | boolean | undefined;
    linked: boolean;
    linked_to: number | undefined;
}
type Output = {
    id: number;
    name: string;
    type: string;
    value: string | number | boolean | undefined;
}
type Trigger = {
    id: number;
    name: string;
    inputs: Input[]
    outputs: Output[]
}
type Reaction = {
    id: number;
    name: string;
    inputs: Input[]
}
type Service = {
    id: number;
    triggers: Trigger[]
    reactions: Reaction[]
    required_subcription: boolean;
    subscribed: boolean | undefined;
}

// ROUTE GET /services
// <- | Returns a list of Service objects
// /!\ If the user is not connected, the subscribed version can be undefined

// ? DASHBOARD PAGE
// : Get the list of trirea's, this is the trirea object
type Trirea = {
    id: number | undefined;
    trigger: Trigger;
    trigger_service_name: string;
    reaction_service_name: string;
    reaction: Reaction;
    enabled: boolean;
}
// ROUTE GET /trireas
// <- | Returns a list of Trirea objects

// ROUTE POST /trirea
//  -> | Send a new Trirea object, the id can be undefined
// <- | 200 if OK