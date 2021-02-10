import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';

import './Collection.css';

function Collection() {
    return (
        <div className='collection-outer-container'>
            <div className='collection-inner-container'>
                <div className='collection-case'>
                    <div className='collection-sleeve'>
                        <p className='collection-text'>Movie Title</p>
                    </div>
                </div>
                <div className='collection-bottom'/>
            </div>
        </div>
    )
}

export default Collection;