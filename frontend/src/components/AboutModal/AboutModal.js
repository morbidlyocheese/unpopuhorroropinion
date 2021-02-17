import React, { useState } from "react";
import { useDispatch } from "react-redux";

import * as sessionActions from "../../store/session";
import './AboutModal.css';

import angellist from './icons/angellist.png';
import github from './icons/github.png';
import linkedin from './icons/linkedin.png';

function AboutModal() {
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    return (
        <div className='about-modal-container'>
            <a className='about-link' href='https://angel.co/u/damien-darko' target="_blank">
                <img src={angellist} alt='angellist'/>
            </a>
            <a className='about-link' href='https://github.com/djangothesolarboy' target="_blank">
                <img src={github} alt='github'/>
            </a>
            <a className='about-link' href='https://www.linkedin.com/in/damien-darko/' target="_blank">
                <img src={linkedin} alt='linkedin'/>
            </a>
        </div>
    );
}

export default AboutModal;