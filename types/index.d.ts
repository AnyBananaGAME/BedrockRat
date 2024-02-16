import { Client } from 'bedrock-protocol';

export interface BedrockRat extends Client {
    mine(blockPosition: string): void;
}

export default BedrockRat;
