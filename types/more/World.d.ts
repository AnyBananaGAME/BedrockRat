import { Block } from "minecraft-data";
import ChunkColumn13 from "prismarine-chunk/src/bedrock/1.3/ChunkColumn";
import { Vec3 } from "vec3";

export interface World {
    getBlock(pos: Vec3): Block,
    setBlock(pos: Vec3, block: Block): void,
    getColumnAt(pos: Vec3): ChunkColumn13,
    setColumnAt(pos: Vec3, column: ChunkColumn13): void;
}