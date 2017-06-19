import React, { Component } from 'react';
import { Grid, Cell, FABButton, Icon, Textfield } from 'react-mdl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import Pagination from 'react-simplest-pagination';
import {
  fetchUserDocuments, searchDocuments } from '../../actions/documentActions';
import UserDocuments from '../documentComponents/UserDocuments';

class DocumentPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      documents: Object.assign({}, props.userDocuments),
      currentUserId: 0
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.getMoreDocuments = this.getMoreDocuments.bind(this);

  }

  componentWillMount() {
    const userId = this.props.auth.user.id;
    this.setState({
      currentUserId: userId
    }, () => {
      this.props.fetchUserDocuments(userId);
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.search !== this.props.search ||
      this.props.userDocuments !== nextProps.userDocuments) {
      const documents = nextProps.search.totalItems > 0 ?
          nextProps.search : nextProps.userDocuments;
      this.setState({ documents: Object.assign({}, documents) });
    }
  }

  onChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const term = this.state.searchTerm;

    if (this.state.searchTerm.length > 0) {
      return this.props.searchDocuments(term)
        .then()
        .catch((error) => {
          toastr.error(error);
        });
    }
    return null;
  }

  clearSearch() {
    this.setState({
      searchTerm: '',
      documents: Object.assign({}, this.props.userDocuments)
    });
  }

  getMoreDocuments(number) {
    this.props.fetchUserDocuments(this.state.currentUserId, number);
  }

  render() {
    const documents = this.state.documents;
    const metaData = this.props.userDocuments.metaData;

    return (
      <div>
        {this.props.auth.isAuthenticated ?
          <Grid>
            <Cell col={2}>
              <span />
            </Cell>
            <Cell col={9}>
              <div>
                <form className="document-form" onSubmit={e => this.onSubmit(e)}>
                  <div className="document-search-form">
                    <Textfield
                      onChange={this.onChange}
                      label="Search"
                      name="search"
                      floatingLabel
                      value={this.state.searchTerm}
                    />
                    <Icon
                      className="icon-close"
                      name="close"
                      onClick={this.clearSearch}
                    />
                  </div>
                </form>

                {
                  documents &&
                    <UserDocuments
                      userDocuments={documents}
                      auth={this.props.auth}
                    />
                }

                <div className="pagination">
                  {
                    metaData &&
                      <Pagination
                        currentPage={metaData.currentPage}
                        totalPages={metaData.pages}
                        onPageClick={number => this.getMoreDocuments((number - 1) * 5)}
                      />
                  }
                </div>
              </div>
            </Cell>
            <Cell col={1}>
              <Link to="/editor">
                <FABButton colored className="add-document-button" ripple>
                  <Icon name="add" />
                </FABButton>
              </Link>
            </Cell>
          </Grid>
        : <h4> You are not authorised to access this page, Please log in </h4>
        }
      </div>
    );
  }
}

DocumentPage.propTypes = {
  fetchUserDocuments: PropTypes.func.isRequired,
  searchDocuments: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  userDocuments: PropTypes.object.isRequired,
  search: PropTypes.any.isRequired
};

const mapStateToProps = state => {
  return {
  auth: state.auth,
  userDocuments: state.documents.userDocuments,
  search: state.search.documents
  }
};

export default connect(mapStateToProps, {
  fetchUserDocuments,
  searchDocuments
})(DocumentPage);

export {
  DocumentPage as DocumentPageComponent
};
