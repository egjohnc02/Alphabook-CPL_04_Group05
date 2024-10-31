import { useEffect } from 'react';

export default function Home(){
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    return (
        <div>
        <h1 className="text-orange">Hello</h1>
        <h1 className="text-orange">Hello</h1>
        <h1 className="text-orange">Hello</h1>
        
        </div>
    )
}