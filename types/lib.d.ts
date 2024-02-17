import BedrockRat from ".";

declare const client: BedrockRat;
declare const eventHandler: () => Promise<void>;
export { client, eventHandler };