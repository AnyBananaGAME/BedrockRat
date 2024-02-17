import BedrockRat from "..";

export interface Event {
    name: string;
    once: boolean;
    execute(params: any[], client: BedrockRat): void;
}

export default Event;
