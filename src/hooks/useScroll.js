import { useEffect, useState } from 'react'

function useScroll() {

    const [isEndOfPage, setIsEndOfPage] = useState(false);

    useEffect(() => {
        function handleScroll2() {
            const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

            if (scrollTop + clientHeight >= scrollHeight) {
                // Aquí puedes llamar a la función que deseas ejecutar cuando llegues al final de la página
                setIsEndOfPage(true);
            } else {
                setIsEndOfPage(false);
            }
        }

        window.addEventListener("scroll", handleScroll2);
        window.addEventListener("touchmove", handleScroll2);

        return () => {
            window.removeEventListener("scroll", handleScroll2);
            window.removeEventListener("touchmove", handleScroll2);
        };
    }, []);

    const handleScroll = () => {
        const documentHeight = document.documentElement.offsetHeight;

        //Visible height in browser
        const windowHeight = window.innerHeight;

        //current vertical scroll position
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Check if end of page 
        if ((scrollTop + windowHeight) >= documentHeight) {
            setIsEndOfPage(true);

        } else {
            setIsEndOfPage(false);
        }

    }

    return isEndOfPage;
}

export default useScroll