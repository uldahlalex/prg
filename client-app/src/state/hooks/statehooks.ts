import {useAtom} from "jotai/index";
import {useEffect} from "react";
import {http} from "../../communication/api.ts";
import {queryPreferencesAtom} from "../atoms/queryPreferencesAtom.ts";
import {tagsAtom, todosAtom, userAtom} from "../atoms/application.state.atoms.ts";
import toast from "react-hot-toast";
import {decodeJwt} from "../../functions/independent/jwtDecoder.ts";
import {User} from "../../types/user.ts";

export default function StateHooks() {
    const [todosQueryPreferences] = useAtom(queryPreferencesAtom);
    const [user, setUser] = useAtom<User | null>(userAtom);

    const [, setTodos] = useAtom(todosAtom);
    const [, setTags] = useAtom(tagsAtom);

    useEffect(() => {
        if(!user) return;
        http.api
            .todosList({
                tags: todosQueryPreferences.tags,
                limit: todosQueryPreferences.limit,
                orderBy: todosQueryPreferences.orderBy,
                direction: todosQueryPreferences.direction
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

    window.addEventListener('error', function (event) {
        toast("Caught in global error handler: " + event.message, {icon: '🔥'})
    });

    window.addEventListener('unhandledrejection', function () {
        toast("Caught in global error handler: ", {icon: '🔥'})
    });


}
