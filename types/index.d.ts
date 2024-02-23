import { Client } from 'bedrock-protocol';
import { Inventory } from '../src/player/Inventory/Inventory';


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
        world: {
            columns: Array      
        }
    }
    inventory: Inventory;
    mine(blockPosition: string): Promise<void>;
}

export default BedrockRat;
