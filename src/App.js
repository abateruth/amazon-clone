
import './App.css';
import CheckOut from './CheckOut';
import Header from './Header';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import { auth } from "./firebase";
import Payment from './Payment';
import React, { useEffect } from "react";
import { useStateValue } from "./Stateprovider";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Orders'


const promise = loadStripe(
  'pk_test_51IwCmlFNW5HW101mefOmnivKuszdEehGUtE1GuAwVJGqcorDS2CgZBzysFVHMnhBYwrhovxLmGsfZ5jW8rFv8LSS00sPt9ue0F'
);


function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      // console.log("THE USER IS >>> ", authUser);
      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <Router>
    <div className="App">
      <Switch>
      <Route path="/Orders">
       <Header />
       <Orders/>
       </Route>
      <Route path="/Login">
       <Login />
       </Route>
       <Route path="/payment">
            <Elements stripe={promise}>
              <Payment />
            </Elements>
            </Route>
        <Route path ="/CheckOut">
         <Header />
        <CheckOut />
        </Route>
         <Route path ="/">
          <Header />
          <Home />
         </Route>
        </Switch>
         </div>
        </Router>
  );
}

export default App;
