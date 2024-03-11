import {queryPreferencesAtom} from "../../../state.ts";
import {QueryPreferences} from "./Query.tsx";
import {useAtom} from "jotai";

export default function SetOrder() {

    const [queryPreferences, setQueryPreferences] = useAtom<QueryPreferences>(queryPreferencesAtom);

    function setOrderBy(param: { direction: string; field: string }) {
        setQueryPreferences({...queryPreferences, orderBy: param})
    }

    return <>
        <h4>Order by</h4>
        <button onClick={() => setOrderBy({field: "title", direction: "asc"})}>Set ordering</button>
    </>

}