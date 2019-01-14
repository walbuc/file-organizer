import React, { Component } from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import { Container, Segment, Grid, Form, Message } from "semantic-ui-react";
import * as actions from "app/actions";
import { createSelector } from "reselect";
import { Link } from "@reach/router";

const selectFiles = state => state.files;
const messageSelector = createSelector(
  selectFiles,
  files => files.successMessage
);

const EditFile = props => (
  <div>
    <Container>
      <Grid>
        <Grid.Column>
          <Segment>
            <h1>Update the file name!</h1>
            <Formik
              initialValues={{ name: "" }}
              validate={values => {
                let errors = {};
                if (!values.name) {
                  errors.name = "Required";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                props.updateFile(props.file, values, setSubmitting);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
              }) => (
                <Form error onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Input
                      fluid
                      placeholder="Enter a new name"
                      type="text"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      width={10}
                    />
                  </Form.Group>
                  <Grid>
                    <Grid.Column computer={10} mobile={16}>
                      {errors.name && touched.name && (
                        <Message
                          fluid
                          error
                          header="Oops"
                          content="You must enter a name."
                        />
                      )}
                    </Grid.Column>
                    <Grid.Column width={8}>
                      <Form.Button type="submit" disabled={isSubmitting}>
                        Submit
                      </Form.Button>
                    </Grid.Column>
                    <Grid.Column width={8}>
                      <Form.Button>
                        <Link to={"/"}>go back</Link>
                      </Form.Button>
                    </Grid.Column>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Segment>
          {props.message && (
            <Segment>
              <h1>{props.message}</h1>
            </Segment>
          )}
        </Grid.Column>
      </Grid>
    </Container>
  </div>
);

const mapState = (state, ownprops) => {
  const message = messageSelector(state);
  return { file: ownprops.id, message };
};

export default connect(
  mapState,
  actions
)(EditFile);
