import React, { Component } from 'react';
import { Grid, Cell, FABButton, Icon, Textfield } from 'react-mdl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import {
  fetchUserDocuments, searchDocuments } from '../../actions/documentActions';
import UserDocuments from '../documentComponents/UserDocuments';

class DocumentPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      documents: Object.assign({}, props.userDocuments)
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  componentWillMount() {
    const userId = this.props.auth.user.id;
    this.props.fetchUserDocuments(userId);
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
    this.props.searchDocuments(term)
    .then()
    .catch((error) => {
      toastr.error(error);
    });
  }

  clearSearch() {
    this.setState({
      searchTerm: '',
      documents: Object.assign({}, this.props.userDocuments)
    });
  }

  render() {
    const documents = this.state.documents;
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
                  <span>
                    <Textfield
                      onChange={this.onChange}
                      label="Search"
                      name="search"
                      floatingLabel
                      value={this.state.searchTerm}
                      style={{ width: '500px' }}
                    />
                    <Icon
                      className="icon-close"
                      name="close"
                      onClick={this.clearSearch}
                    />
                  </span>
                </form>

                {documents ?
                  <UserDocuments
                    userDocuments={documents}
                    auth={this.props.auth}
                  />
                : <span />
                }
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
  search: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  userDocuments: state.documents.userDocuments,
  search: state.search.documents || []
});

export default connect(mapStateToProps, {
  fetchUserDocuments,
  searchDocuments
})(DocumentPage);

export {
  DocumentPage as DocumentPageComponent
};
