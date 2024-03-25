import {atom} from "jotai";
import {Tag, TodoWithTags} from "../../../httpclient/Api.ts";
import {User} from "../../types/user.ts";


export const todosAtom = atom<TodoWithTags[]>([]);
export const tagsAtom = atom<Tag[]>([]);
export const userAtom = atom<User | null>(null);

export const themeAtom = atom<string>(""); //todo


export const toastListAtom = atom<Toast[]>([]);

export interface Toast {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
}

export const addToastAtom = atom(
    (get) => get(toastListAtom),
    (get, set, { message, type }) => {
        const id = Math.random().toString(36).substring(2,8);
        const newToast: Toast = { id, message, type };
        set(toastListAtom, [...get(toastListAtom), newToast]);
        setTimeout(() => {
            set(toastListAtom, get(toastListAtom).filter((toast) => toast.id !== id));
        }, 2000);
    }
);
