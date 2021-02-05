import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import SearchBar from '../Search/Searchbar';

import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <ProfileButton className='profile-button' user={sessionUser} />
                <SearchBar/>
            </>
        );
    } else {
        sessionLinks = (
            <>
                <div className='navbar-links'>
                    <LoginFormModal />
                </div>
                <div className='navbar-links'>
                    <SignupFormModal />
                </div>
            </>
        );
    }

    return (
        <>
            <div className='navbar-links' >
                <NavLink className='home' exact to="/">Home</NavLink>
            </div>
            {isLoaded && sessionLinks}
        </>
    );
}

export default Navigation;