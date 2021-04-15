import React from 'react';
import classes from './Drawer.module.scss'
import Backdrop from "../../UI/Backdrop/Backdrop";

const Drawer = ({isOpen, onClose}) => {
    const links = [1, 2, 3]
    const renderLinks = () => {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <a>Link {link}</a>
                </li>
            )
        })
    }
    const cls = [classes.Drawer]
    if (!isOpen) {
        cls.push(classes.close)
    }
    return (
        <>
            <nav className={cls.join(' ')}>
                <ul>
                    {renderLinks()}
                </ul>
            </nav>
            {isOpen && <Backdrop onClick={onClose}/>}
        </>
    );
};

export default Drawer;