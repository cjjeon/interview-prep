import React from 'react';

import './Loading.css'

/*
    This component was copied from
    https://codepen.io/ivillamil/pen/dokmG/
 */

const Loading = () => {
    return (
        <div className={'flex justify-center items-center h-screen w-full'}>
            <div className={'loader'}/>
        </div>
    );
};

export default Loading;