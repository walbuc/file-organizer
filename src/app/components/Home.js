import React, { Component } from "react";
import { Grid, Segment, Container } from "semantic-ui-react";
import Tags from "./Tags";
import Files from "./Files";

class Home extends Component {
  render() {
    return (
      <Container>
        <Grid columns={2} stackable>
          <Grid.Column>
            <Segment>
              <Tags />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Files />
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default Home;
