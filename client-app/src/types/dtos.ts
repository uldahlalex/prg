import {Tag} from "./tag.ts";

export type CreateTodoDto = {
    title: string;
    description: string;
    due: Date;
    priority: number;
    tags: Tag[];
}