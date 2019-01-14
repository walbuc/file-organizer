/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { List, Header } from "semantic-ui-react";
import _ from "lodash";
import * as actions from "app/actions";

import orm from "app/orm";

export const selectTagEntity = state => state.entities;

export const getTagSession = createSelector(
  selectTagEntity,
  entities => orm.session(entities)
);

const selectTags = state => state.entities;

const tagsSelector = createSelector(
  selectTags,
  entities => entities.Tag.itemsById
);
const tagsErrorSelector = createSelector(
  selectTags,
  tags => tags.errorMessage
);

const tagsLoadingSelector = createSelector(
  selectTags,
  tags => tags.isLoading
);

class Tags extends Component {
  componentDidMount() {
    this.props.getTags();
  }

  renderTagsList = tags => {
    return (
      <List>
        {_.map(tags, tag => (
          <List.Item key={tag.tag}>
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                this.props.selectTag(tag.tag);
                this.props.getFiles(tag.tag);
              }}
            >
              {tag.tag} ({tag.files})
            </a>
          </List.Item>
        ))}
      </List>
    );
  };
  render() {
    const { tags, isLoading, errorMessage } = this.props;
    return (
      <>
        <Header as="h2">Tags</Header>
        {(isLoading && "Loading") || this.renderTagsList(tags)}
      </>
    );
  }
}

const mapStateToProps = state => {
  const tags = tagsSelector(state);
  return { tags };
};

export default connect(
  mapStateToProps,
  actions
)(Tags);
