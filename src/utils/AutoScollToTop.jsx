import { useEffect } from 'react';

export default function AutoScrollToTop(){
    return useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
}

