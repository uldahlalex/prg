// useMessageHandler.ts
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAtom} from "jotai/index";
import {courseIdAtom, fullstackId, sys} from "../../state/atoms/application.state.atoms.ts";

export const useMessageHandler = () => {
    const navigate = useNavigate();
    const [courseId, setCourseId] = useAtom(courseIdAtom);

    useEffect(() => {
        const handleMessage = (event) => {

            setCourseId(event.data.courseId);

            if (event.origin !== "https://moodle.easv.dk") {
                return;
            }
            if (event.data.courseId == fullstackId) {
                navigate('fullstack');
            } else if (event.data.courseId == sys //todo
            ) {
                navigate('programmingii2024');
            }
        };

        try {
            window.addEventListener('message', handleMessage);
            return () => window.removeEventListener('message', handleMessage);
        } catch (e) {
            
        }
        
    }, [navigate]);
};
