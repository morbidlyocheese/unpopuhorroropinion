import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import About from '../AboutModal/About';

import * as sessionActions from '../../store/session';
import * as collectionActions from '../../store/collection';

import './Navigation.css';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const userId = useSelector((state) => state.session.user.id);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    dispatch(collectionActions.getUserCollections(userId));
    // console.log(userId)


    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <div className='navbar-right'>
            <About/>
            <button className='profile-button' onClick={openMenu}>
                {user.username}
            </button>
            <div className='profile-dropdown-inner-container'>
                {showMenu && (
                    <>
                        <ul className="profile-dropdown">
                            <li>{user.email}</li>
                            <a href={`/users/${userId}/profile`}>PROFILE</a>
                            <button className='logout' onClick={logout}>Logout</button>
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
}

export default ProfileButton;