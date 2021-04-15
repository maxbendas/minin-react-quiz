import React, {useState} from 'react';
import classes from './Layout.module.scss';
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";

const Layout = ({children}) => {
    const [menu, setMenu] = useState(false)

    const toggleMenuHandler = () => {
        setMenu(!menu)
    }
    const menuCloseHandler = () => {
        setMenu(false)
    }

    return (
        <div className={classes.Layout}>
            <Drawer
                isOpen={menu}
                onClose={menuCloseHandler}
            />
            <MenuToggle
                isOpen={menu}
                onToggle={toggleMenuHandler}
            />
            <main>
                {children}
            </main>
        </div>
    );
}

export default Layout;