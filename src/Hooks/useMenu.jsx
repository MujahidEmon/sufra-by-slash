import { useEffect, useState } from "react";


const useMenu = () => {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        fetch('/menu.json')
        .then(res => res.json())
        .then(data => {
            // console.log(da);
            setMenu(data)
        })
    },[])
    return menu;
};

export default useMenu;