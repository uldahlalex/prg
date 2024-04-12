import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import {userAtom} from "./atoms/user.ts";
import {decodeJwt} from "../functions/jwtDecoder.ts";

export const useInitializeApp = () => {
    const setUser = useSetAtom(userAtom);
    useEffect(() => {
        const jwt = localStorage.getItem('token');
        if (jwt) {
            const user = decodeJwt(jwt);
            setUser(user);
        } else {
            setUser(null);
        }
    }, [setUser]);

};