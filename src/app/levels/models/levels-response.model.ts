import { Level } from "./level.model";

export interface LevelsResponse {
    isSuccess: boolean,
    messages: [],
    data: Level[]
}

export interface LevelResponse {
    isSuccess: boolean,
    messages: [],
    data: Level
}