export interface QueryPreferences {
    limit: number | 50;
    showCompleted: boolean;
    tags: number[];
    orderBy: string | "dueDate" | "title" | "priority" | "id";
    direction: string | "asc" | "desc";
}
