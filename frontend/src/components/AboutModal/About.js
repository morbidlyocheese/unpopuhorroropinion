import React, { useState } from 'react';

import { Modal } from '../../context/Modal';
import AboutModal from './AboutModal';
import './AboutModal.css';

function About() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='navbar-right about' onClick={() => setShowModal(true)}>About</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AboutModal/>
                </Modal>
            )}
        </>
    );
}

export default About;