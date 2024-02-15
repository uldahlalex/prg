export interface Todo {
    id?: number;
    title: string;
    description: string;
    done?: boolean;
    priority?: string;
    due?: Date;
    tags?: string[];
}