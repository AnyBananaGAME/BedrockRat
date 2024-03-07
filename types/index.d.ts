import { Client } from 'bedrock-protocol';
import { Inventory } from '../src/player/Inventory/Inventory';
import { World } from './more/World';
import { BedrockChunk, CommonChunk } from 'prismarine-chunk';
import { Container } from '../src/network/types/Container'
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
            columns: Array<CommonChunk>      
        },
        container: Container
    }
    world: World

    inventory: Container,
    mine(blockPosition: string): Promise<void>;
}

export default BedrockRat;
