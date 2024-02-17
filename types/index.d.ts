import { Client } from 'bedrock-protocol';


/**
 * Returns the Position of something.
 */
interface Position {
    x: number;
    y: number;
    z: number;
}

export interface BedrockRat extends Client {
    data: {
        position: Position;
        tick: number;
        debug: boolean;
        runtime_entity_id: number;
        yaw: number;
        pitch: number;
    }
    mine(blockPosition: string): Promise<void>;
}

export default BedrockRat;
