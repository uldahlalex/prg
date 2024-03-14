import {Navigate} from "react-router-dom";
import React from "react";

export default function RequireAuth ({children, redirect})  {
    const token = localStorage.getItem('token');
    if (token && token.length > 0)
        return children;
    return (<Navigate to={redirect} replace/>);
};