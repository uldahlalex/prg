import {useAtom} from "jotai/index";
import {useEffect} from "react";
import {queryPreferencesAtom} from "../../state/atoms/queryPreferencesAtom.ts";
import {toastsAtom, tagsAtom, todosAtom, userAtom} from "../../state/atoms/application.state.atoms.ts";
import {decodeJwt} from "../jwtDecoder.ts";
import {User} from "../../types/user.ts";
import {http} from "../setupHttpClient.ts";

export default function StateHooks() {
    const [todosQueryPreferences] = useAtom(queryPreferencesAtom);
    const [user, setUser] = useAtom<User | null>(userAtom);

    const [, setTodos] = useAtom(todosAtom);
    const [, setTags] = useAtom(tagsAtom);

    const [, addToast] = useAtom(toastsAtom);


    //Get new todos when query preferences change
    useEffect(() => {
        console.log("triggered todos effect")
        if (!user) return;
        http.api
            .todosList({
                orderBy: todosQueryPreferences.orderBy,
                direction: todosQueryPreferences.direction,
                serializedTagArray: JSON.stringify(todosQueryPreferences.tags),
                limit: todosQueryPreferences.limit,
                showCompleted: todosQueryPreferences.showCompleted
            })
            .then(resp => setTodos(resp.data))

    }, [user, todosQueryPreferences]);

    //get tags when user changes
    useEffect(() => {
        console.log("triggered get tags effect")
        if (!user) return;
        http.api
            .tagsList()
            .then(resp => setTags(resp.data))
    }, [user]);

    //set user when app opens
    useEffect(() => {
        console.log("triggered user effect")
        const jwt = localStorage.getItem('token');
        if (!jwt || jwt.length == 0)
            setUser(null);
        else {
            const u = decodeJwt(jwt);
            addToast({ message: 'Welcome back, '+u.username, type: 'info'});
            setUser(u);
        }
    }, []);

    //set theme when app opens
    useEffect(() => {
        console.log("triggered theme effect")
        const theme = localStorage.getItem('theme') ?? "light";
        document.documentElement.setAttribute('data-theme', theme);
        window.dispatchEvent(new Event('theme-change'));
        localStorage.setItem('theme', theme);
        addToast({ message: 'Theme set to '+theme, type: 'info'});
    }, []);
}
