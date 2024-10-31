import { useEffect } from 'react';

export default function AutoScrollToTop(){
        useEffect(() => {
            window.scrollTo(0, 0);
          }, []);
}
