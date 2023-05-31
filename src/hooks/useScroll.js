import { useEffect, useState } from 'react'

function useScroll() {

    const [isEndOfPage, setIsEndOfPage] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("touchmove", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("touchmove", handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const documentHeight = document.documentElement.offsetHeight;

        //Visible height in browser
        const windowHeight = window.innerHeight;

        //current vertical scroll position
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Check if end of page 
        if ( (scrollTop + windowHeight) >= documentHeight) {
            setIsEndOfPage(true);

        } else {
            setIsEndOfPage(false);
        }

    }

    return isEndOfPage;
}

export default useScroll