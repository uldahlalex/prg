import {Tag} from "./tag.ts";

export interface Todo {
    id?: number;
    title: string;
    description: string;
    isCompleted?: boolean;
    priority?: string;
    dueDate?: Date;
    tags?: Tag[];
}