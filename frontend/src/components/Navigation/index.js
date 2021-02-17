import React from 'react';
import { useSelector } from 'react-redux';

import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import SearchBar from '../Search/Searchbar';
import CollectionDropdown from './CollectionDropdown';

import './Navigation.css';
import { useHistory } from 'react-router-dom';

function Navigation({ isLoaded }) {
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const handleClick = () => {
        history.push('/movies/discover');
    }

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <div className='navbar-left'>
                    <input type='button' onClick={handleClick} value='Home' className='discover'/>
                    <CollectionDropdown className='collection-dropdown'/>
                    <SearchBar className='searchbar'/>
                </div>
                <div className='navbar-center'>
                    <a href='/movies/discover' className='title title-top'>
                        <span>Unpopuhorroropinion</span>
                    </a>
                </div>
                <ProfileButton className='profile-button' user={sessionUser}/>
            </>
        );
    } else {
        sessionLinks = (
            <>
                <LoginFormModal className='login-modal'/>
                <SignupFormModal className='signup-modal'/>
            </>
        );
    }

    return (
        <>
            <div className='navbar-outer-container'>
                {isLoaded && sessionLinks}
            </div>
        </>
    );
}

export default Navigation;