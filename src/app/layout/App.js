import React, { Component } from "react";
import { Header } from "semantic-ui-react";
import { Router } from "@reach/router";
import Home from "app/components/Home";
import EditFile from "app/components/EditFile";

const style = {
  h1: {
    marginTop: "3em"
  }
};

const App = () => (
  <>
    <Header as="h1" className="centered" style={style.h1}>
      <Header.Content>File Organizer</Header.Content>
    </Header>
    <Router>
      <Home path="/" />
      <EditFile path="/files/:id" />
    </Router>
  </>
);

export default App;
