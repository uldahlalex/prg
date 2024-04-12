import {atom} from "jotai/index";
import {User} from "../../types/user.ts";
import {atomEffect} from "jotai-effect";
import toast from "react-hot-toast";

export const userAtom = atom<User | null>(null);

export const userEffect = atomEffect((get) => {
    const user = get(userAtom);
    if (user) {
        toast('Welcome back ' + user.username);
    } else {
        console.log("waat")
    }
});