import {useAtom} from "jotai/index";
import {useEffect} from "react";
import {queryPreferencesAtom} from "../../state/atoms/queryPreferencesAtom.ts";
import {tagsAtom, todosAtom, userAtom} from "../../state/atoms/application.state.atoms.ts";
import toast from "react-hot-toast";
import {decodeJwt} from "../jwtDecoder.ts";
import {User} from "../../types/user.ts";
import {http} from "../setupHttpClient.ts";

export default function StateHooks() {
    const [todosQueryPreferences] = useAtom(queryPreferencesAtom);
    const [user, setUser] = useAtom<User | null>(userAtom);

    const [, setTodos] = useAtom(todosAtom);
    const [, setTags] = useAtom(tagsAtom);

    useEffect(() => {
        if(!user) return;
        http.api
            .todosList({
                orderBy: todosQueryPreferences.orderBy,
                direction: todosQueryPreferences.direction,
                serializedTagArray: JSON.stringify(todosQueryPreferences.tags),
                limit: todosQueryPreferences.limit
            })
            .then(resp => setTodos(resp.data))

    }, [user, todosQueryPreferences]);

    useEffect(() => {
        const jwt = localStorage.getItem('token');
        if(!jwt || jwt.length==0)
            setUser(null);
        else {
            setUser(decodeJwt(jwt));
        }
    }, []); //Are there other hooks that impact this??

    useEffect(() => {
        if(!user) return;
        http.api
            .tagsList()
            .then(resp => setTags(resp.data))
    }, [user]);

}
