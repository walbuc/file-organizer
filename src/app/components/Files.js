import React, { Component } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { List, Header, Pagination } from "semantic-ui-react";
import { Link } from "@reach/router";
import _ from "lodash";
import * as actions from "app/actions";

const selectFiles = state => state.entities.File.itemsById;
const selectTags = state => state.entities.Tag.itemsById;
const selectCurrentTag = state => state.tags;
const selectPaginator = state => state.paginator;

const currentTagSelector = createSelector(
  selectCurrentTag,
  tags => tags.currentTag
);

const filesSelector = createSelector(
  selectFiles,
  currentTagSelector,
  selectPaginator,
  (files, currentTag, paginator) => {
    if (paginator[currentTag]) {
      const currentPage = paginator[currentTag].currentPage;
      const pageIds = paginator[currentTag].pages[currentPage];
      return pageIds.map(id => files[id]);
    }
    return null;
  }
);

const currentTag = createSelector(
  currentTagSelector,
  selectTags,
  (id, tags) => tags[id]
);
const currentPageSelector = createSelector(
  currentTagSelector,
  selectPaginator,
  (currentTag, paginator) => paginator[currentTag]
);

const filesErrorSelector = createSelector(
  selectFiles,
  files => files.errorMessage
);

const filesLoadingSelector = createSelector(
  selectFiles,
  files => files.isLoading
);

class Files extends Component {
  state = { limit: 10 };
  handlePaginationChange = (e, { activePage }) => {
    this.props.getFiles(this.props.tag.tag, activePage);
  };

  renderFilesList = files => {
    return (
      <>
        <List>
          {_.map(files, file => (
            <List.Item key={file.id}>
              <p>
                <Link to={`/files/${file.id}`}>{file.name}</Link>
              </p>
            </List.Item>
          ))}
        </List>
        {this.props.pages && (
          <>
            <Pagination
              boundaryRange={0}
              ellipsisItem={null}
              firstItem={null}
              lastItem={null}
              siblingRange={1}
              onPageChange={this.handlePaginationChange}
              totalPages={Math.ceil(this.props.tag.files / this.state.limit)}
              activePage={this.props.pages.currentPage}
            />
          </>
        )}
      </>
    );
  };
  render() {
    const { files, isLoading, errorMessage } = this.props;
    return (
      <>
        <Header as="h2">Search Results:</Header>
        {(isLoading && !files && "Loading") || this.renderFilesList(files)}
      </>
    );
  }
}

const mapStateToProps = state => {
  const files = filesSelector(state);
  const pages = currentPageSelector(state);
  const tag = currentTag(state);

  return { files, pages, tag };
};

export default connect(
  mapStateToProps,
  actions
)(Files);
