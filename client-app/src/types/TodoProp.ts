import {TodoWithTags} from "../../httpclient/Api.ts";

export interface TodoProp {
    todo: TodoWithTags;
}
export interface CheckIdProp {
    children: any;
    disallowedPageIds: number[];
}