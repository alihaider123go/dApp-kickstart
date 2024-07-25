import React from 'react';
import Head from 'next/head';
import 'semantic-ui-css/semantic.min.css'
import Header from './Header';
import { Container } from 'semantic-ui-react'

const Layout = ({ children }) => {
    return (
        <Container>
            <Head>
                <title>KickStart</title>
            </Head>
            <Header />
            <main>{children}</main>
        </Container>
    );
};
export default Layout;