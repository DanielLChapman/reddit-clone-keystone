import React from 'react';
import Head from 'next/head';
import FrontPage from '../components/FrontPage';


function index(props) {
    return (
        <div>
            <Head>
                <title>Reddit:Clone</title>
            </Head>
            <FrontPage />

        </div>
    );
}

export default index;
