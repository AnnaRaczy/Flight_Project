import { useEffect, useRef, useState } from "react";

export default function useVisibleComponent(initialIsVisible) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible)
    const ref = useRef(null);

    function handleDismiss(e) {
        if (ref.current && !ref.current.contains(e.target)) {
            setIsComponentVisible(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleDismiss, true)
        return () => {
            document.removeEventListener('click', handleDismiss, true)
        }
    }, [])

    return { ref, isComponentVisible, setIsComponentVisible }
}
