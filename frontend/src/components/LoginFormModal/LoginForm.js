import React, { useState } from "react";
import { useDispatch } from "react-redux";

import * as sessionActions from "../../store/session";
import './LoginForm.css';

function LoginForm() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password })).catch(
            (res) => {
                if (res.data && res.data.errors) setErrors(res.data.errors);
            }
        );
    };

    const demo = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.demoLogin( ))
            .catch((res) => {
                if (res.data && res.data.errors) setErrors(res.data.errors);
            });
    };

    return (
        <div className='login-modal-container'>
            <form className='login-form' onSubmit={handleSubmit}>
                <ul className='login-errors'>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <div className='login-form-username-container'>
                    <label className='login-form-username-label'>
                        Username/Email:
                    </label>
                    <input
                            className='login-form-input login-username'
                            type="text"
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            required
                        />
                </div>
                <div className='login-form-password-container'>
                    <label className='login-form-password-label'>
                        Password:
                    </label>
                <input
                            className='login-form-input login-password'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                </div>
                <div className='login-form-submit-container'>
                    <button className='login-form-submit' type="submit">Login</button>
                </div>
                <div className='demo-container'>
                    <button className='demo-login' onClick={demo}>Demo-login</button>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;