import React from 'react';
// import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import SearchBar from '../Search/Searchbar';
// import MoviesPage from '../../components/MoviePage/MoviesPage';

import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <div className='navbar-container'>
                    {/* <NavLink className='home' exact to="/">Home</NavLink> */}
                    <a className='discover' href='/movies/discover'>Home</a>
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