import { useEffect } from "react";

const useNav = (title: string) => {
    useEffect(() => {
        document.title = title;
    }, [title]);
};
export default useNav;
