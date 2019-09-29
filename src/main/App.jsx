import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import React from 'react'

import Logo from '../componentes/template/Logo'
import Nav from '../componentes/template/Nav'
// import Home from '../componentes/home/Home'
import Footer from '../componentes/template/Footer'

// import { BrowserRouter } from 'react-router-dom' //pode ter problemas em produção
import { HashRouter } from 'react-router-dom'

import Routes from './Routes'

export default props =>
    <HashRouter>
        <div className="app">
            <Logo />
            <Nav />
            <Routes />
            <Footer />
        </div>
    </HashRouter>
