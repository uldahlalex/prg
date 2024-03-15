import {Navigate} from "react-router-dom";
import React from "react";
import {userAtom} from "../../state/atoms/application.state.atoms.ts";
import {useAtom} from "jotai/index";

export default function RequireAuth({children, redirect}) {
    const [user] = useAtom(userAtom);
    if (user)
        return children;
    return (<Navigate to={redirect} replace/>);
};