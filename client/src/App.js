import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Container } from '@material-ui/core';
import React from 'react';

import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Auth from './components/Auth/Auth';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Clock from './components/Clock/Clock';
import Seller from './components/Seller/Seller';
import ProductForm from './components/ProductForm/ProductForm';
import CompanyForm from './components/CompanyForm/CompanyForm';
import View from './components/View/View';
import Inquiry from './components/Inquiry/Inquiry';
import DataInquiry from './components/DataInquiry/DataInquiry';
import OrderForm from './components/OrderForm/OrderForm';
import DataOrder from './components/DataOrder/DataOrder';

const App = () => {

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Clock />
        <Navbar />
        <Switch>
          <Route exact path="/" render={() => (
            localStorage.getItem('profile') ? (
              <Home />
            ) : (
              <Redirect to="/auth" />
            )
          )} />
          <Route path="/auth" exact component={Auth} />
          <Route exact path="/about" render={() => (
            <About />
          )} />
          <Route exact path="/contact" render={() => (
            localStorage.getItem('profile') ? (
              <Contact />
            ) : (
              <Redirect to="/auth" />
            )
          )} />
          <Route exact path="/view/:id" render={() => (
            localStorage.getItem('profile') ? (
              <View />
            ) : (
              <Redirect to="/auth" />
            )
          )} />
          <Route exact path="/inquiry/:id/:userid" render={() => (
            localStorage.getItem('profile') ? (
              <Inquiry />
            ) : (
              <Redirect to="/auth" />
            )
          )} />
          <Route exact path="/inquiries" render={() => (
            localStorage.getItem('profile') ? (
              <DataInquiry />
            ) : (
              <Redirect to="/auth" />
            )
          )} />
          <Route exact path="/orders" render={() => (
            localStorage.getItem('profile') ? (
              <DataOrder />
            ) : (
              <Redirect to="/auth" />
            )
          )} />
          <Route exact path="/productform" render={() => (
            localStorage.getItem('profile') ? (
              <ProductForm />
            ) : (
              <Redirect to="/auth" />
            )
          )} />
          <Route exact path="/orderform/:id" render={() => (
            localStorage.getItem('profile') ? (
              <OrderForm />
            ) : (
              <Redirect to="/auth" />
            )
          )} />
          <Route exact path="/seller" render={() => (
            localStorage.getItem('profile') ? (
              <Seller />
            ) : (
              <Redirect to="/auth" />
            )
          )} />
        </Switch>
        <Footer />
      </Container>
    </BrowserRouter>
  )
};

export default App;