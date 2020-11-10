import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Avatar } from "../avatar";
import { Navbar, Nav, Button, Form } from "react-bootstrap";

import { Home } from "../home";
import { Favourites } from "../favourites";

export function NavbarHeader() {
  return (
    <Router>
      <Navbar className="justify-content-between" bg="dark" variant="dark">
        <Link to="/">
          <Navbar.Brand href="/home">Home</Navbar.Brand>
        </Link>
        <Form inline className="float-right">
          <Link to="/favourites">
            <Button className="mr-2 float-right" variant="outline-light">
              Favourites
            </Button>
          </Link>
          <Nav>
            <Avatar imgSrc="https://randomuser.me/api/portraits/men/6.jpg"></Avatar>
          </Nav>
        </Form>
      </Navbar>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/favourites">
          <Favourites />
        </Route>
      </Switch>
    </Router>
  );
}
