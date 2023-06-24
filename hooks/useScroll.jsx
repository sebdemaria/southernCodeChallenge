import { useCallback, useEffect, useState } from "react";

export const useScroll = () => {
    const [isHeaderHidden, setIsHeaderHidden] = useState(false);

    const handleScroll = useCallback(() => {
        // calculate scroll percentage
        let scrollTop = window.scrollY;

        // set header blur according to scroll position
        if (scrollTop === 0) {
            setIsHeaderHidden(false);
        } else if (scrollTop > 40) {
            setIsHeaderHidden(true);
        }
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

    return [isHeaderHidden];
};
