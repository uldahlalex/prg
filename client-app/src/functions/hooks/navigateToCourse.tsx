// useMessageHandler.ts
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAtom} from "jotai/index";
import {courseIdAtom, fullstackId, sys} from "../../state/atoms/application.state.atoms.ts";
import toast from "react-hot-toast";

export const useMessageHandler = () => {
    const navigate = useNavigate();
    const [, setCourseId] = useAtom(courseIdAtom);

    useEffect(() => {
        const handleMessage = (event) => {

            setCourseId(event.data.courseId);

            if (event.origin !== "https://moodle.easv.dk") {
                return;
            }
            if (event.data.courseId) {
                navigate(event.data.courseId);
                toast('Welcome back')
            }
        };

        try {
            window.addEventListener('message', handleMessage);
            return () => window.removeEventListener('message', handleMessage);
        } catch (e) {
            
        }
        
    }, [navigate]);
};
