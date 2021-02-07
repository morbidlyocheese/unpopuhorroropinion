import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import './Collection.css';

function Collection() {
    return (
        <div className='collection-outer-container'>
            <div className='collection-inner-container'>
                <div className='collection-case'>
                    <p className='collection-text'>Movie</p>
                </div>
                <div className='collection-bottom'/>
            </div>
        </div>
    )
}

export default Collection;