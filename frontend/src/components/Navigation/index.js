import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import SearchBar from '../Search/Searchbar';
import CollectionDropdown from './CollectionDropdown';

import './Navigation.css';
import { useParams } from 'react-router-dom';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <div className='navbar-container'>
                    <a className='discover' href='/movies/discover'>Home</a>
                    <CollectionDropdown className='collection-dropdown'/>
                    <SearchBar className='searchbar'/>
                </div>
                <ProfileButton className='profile-button' user={sessionUser}/>
            </>
        );
    } else {
        sessionLinks = (
            <div className='navbar-container'>
                <LoginFormModal className='login-modal'/>
                <SignupFormModal className='signup-modal'/>
            </div>
        );
    }

    return (
        <>
            <div className='navbar-container'>
                {isLoaded && sessionLinks}
            </div>
        </>
    );
}

export default Navigation;