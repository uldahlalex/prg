import {useAtom} from "jotai/index";
import {useEffect} from "react";
import {getTodosEffect, queryPreferencesAtom} from "../../state/atoms/queryPreferencesAtom.ts";
import {tagsAtom, todosAtom} from "../../state/atoms/application.state.atoms.ts";
import {decodeJwt} from "../jwtDecoder.ts";
import {User} from "../../types/user.ts";
import {http} from "../setupHttpClient.ts";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {userAtom, userEffect} from "../../state/atoms/user.ts";

export default function StateHooks() {
    const [todosQueryPreferences] = useAtom(queryPreferencesAtom);
    const [user, setUser] = useAtom<User | null>(userAtom);

    const [, setTodos] = useAtom(todosAtom);
    const [, setTags] = useAtom(tagsAtom);
    const navigate = useNavigate();
    useAtom(userEffect);
    useAtom(getTodosEffect);


    return null;
}
