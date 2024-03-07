import {Tag} from "./tag.ts";

export type CreateTodoDto = {
    title: string;
    description: string;
    dueDate: Date;
    priority: number;
    tags: Tag[];
}