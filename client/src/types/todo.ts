import {Tag} from "./tag.ts";

export interface Todo {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    userId: number;
    priority: number;
    dueDate: Date;
    tags: Tag[]
}