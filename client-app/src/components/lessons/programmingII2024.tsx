import {courseIdAtom, fullstackId} from "../../state/atoms/application.state.atoms.ts";
import {Navigate} from "react-router-dom";
import React from "react";
import {useAtom} from "jotai/index";

export default function ProgrammingII2024() {

    const [courseId] = useAtom(courseIdAtom);


    return(<></>)
}