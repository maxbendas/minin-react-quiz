import React from 'react';
import classes from './Drawer.module.scss'
import Backdrop from "../../UI/Backdrop/Backdrop";
import {NavLink} from "react-router-dom";

const Drawer = ({isOpen, onClose}) => {
    const links = [
        {to: '/', label: 'List', exact: true},
        {to: '/auth', label: 'Auth', exact: false},
        {to: '/quiz-creator', label: 'Quiz Creator', exact: false},
    ]
    const renderLinks = () => {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={classes.active}
                        onClick={onClose}
                    >
                        {link.label}
                    </NavLink>
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