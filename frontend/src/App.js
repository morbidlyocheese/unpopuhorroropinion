import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import SignupForm from "./components/SignupFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import MoviesList from './components/MoviePage/MoviesPage';
import MoviePage from './components/MoviePage/MoviePage';
import Collection from './components/CollectionPage/Collection';
import ProfilePage from './components/ProfilePage/ProfilePage.js';

import './index.css'
import SearchPage from "./components/Search/SearchPage";
import SplashPage from "./components/SplashPage/Splash";

function App() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  // dispatch(getAllCollections());

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <>
          <Switch>
            <Route path="/signup">
              <SignupForm/>
            </Route>
          </Switch>
          <Route exact path='/'>
            <SplashPage/>
          </Route>
          <div className='body-container'>
            <Route path='/movies/search'>
              {sessionUser ? <SearchPage/> : <Redirect to='/'/>}
            </Route>
            <Route path='/movies/discover'>
              {sessionUser ? <MoviesList/> : <Redirect to='/'/>}
            </Route>
            <Route path='/movies/details/:id'>
              {sessionUser ? <MoviePage/> : <Redirect to='/'/>}
            </Route>
            <Route path='/users/:id/collections/:id'>
              {sessionUser ? <Collection/> : <Redirect to='/'/>}
            </Route>
            <Route path='/users/:id/profile'>
              {sessionUser ? <ProfilePage/> : <Redirect to='/'/>}
            </Route>
          </div>
        </>
      )}
    </>
  );
}

export default App;