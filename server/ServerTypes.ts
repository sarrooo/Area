// ? CREATE TRIREA FORM 1
// : Get list of possible services with triggers and reactions
type Input = {
    id: number | undefined;
    name: string;
    description: string | undefined;
    regex: string | undefined;
    mandatory: boolean;
    type: string;
    value: string | number | boolean | undefined;
    linked: boolean;
    linked_to: number | undefined;
}
type Output = {
    id: number | undefined;
    name: string;
    description: string | undefined;
    regex: string | undefined;
    type: string;
    value: string | number | boolean | undefined;
}
type Trigger = {
    id: number | undefined;
    name: string;
    description: string | undefined;
    inputs: Input[]
    outputs: Output[]
}
type Reaction = {
    id: number | undefined;
    name: string;
    description: string | undefined;
    inputs: Input[]
}
type Service = {
    id: number | undefined;
    name: string;
    description: string | undefined;
    image: string | undefined;
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

// ROUTE GET /trireas/:id
// <- | Returns a Trirea object

// ROUTE POST /trirea
//  -> | Send a new Trirea object, the id can be undefined
// <- | 200 if OK
