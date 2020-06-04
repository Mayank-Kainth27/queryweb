import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from './components/navbar';
import LandingPage from './components/landingPage';
import Login from './components/login';
import Signup from './components/signup';
import Footer from './components/footer';
import Main from './components/mainPage';
import Question from './components/question';
import Answer from './components/answer';
import Answer2 from './components/answer2';
import AllAnswers from './components/allAnswers';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="my-2">
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/user/login" exact component={Login} />
          <Route path="/user/signup" exact component={Signup} />
          <Route path="/exercise/main" exact component={Main} />
          <Route path="/exercise/question" exact component={Question} />
          <Route path="/exercise/answer" exact component={Answer} />
          <Route path="/exercise/answer2/:id" exact component={Answer2} />
          <Route path="/exercise/allAnswers/:id" exact component={AllAnswers} />
          <Route render={() => { return <h1 align="center" style={{ height: "500px" }}> Page Not Found </h1> }} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
