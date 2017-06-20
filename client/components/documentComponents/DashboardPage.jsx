import React, { Component } from 'react';
import { Grid, Cell, FABButton, Icon, Textfield } from 'react-mdl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import Pagination from 'react-simplest-pagination';
import {
  fetchDocuments, searchDocuments } from '../../actions/documentActions';
import Dashboard from './Dashboard';
import { isAdmin } from '../../utils/Utils';

class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      documents: Object.assign({}, props.allDocuments)
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.getMoreDocuments = this.getMoreDocuments.bind(this);
  }

  componentWillMount() {
    this.props.fetchDocuments();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.search !== this.props.search ||
      this.props.allDocuments !== nextProps.allDocuments) {
      let documents = {};
      documents = nextProps.search.totalItems > 0 ?
          nextProps.search : nextProps.allDocuments;
      documents.pageHeader = nextProps.search.totalItems > 0 ?
          'Search results' : 'My Documents';
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
      return this.props.searchDocuments(term);
    }
    return null;
  }

  clearSearch() {
    this.setState({
      searchTerm: '',
      documents: Object.assign({}, this.props.allDocuments)
    });
  }

  getMoreDocuments(number) {
    this.props.fetchDocuments(number);
  }

  render() {
    const documents = this.state.documents;
    const metaData = this.state.documents.metaData;
  
    return (
      <div>
        {this.props.auth.isAuthenticated ?
          <Grid>
            <Cell col={2}>
              <span />
            </Cell>
            <Cell col={9}>
              <div>
                <form className="dashboard-form" onSubmit={e => this.onSubmit(e)}>
                  <div className="document-search-form">
                    <Textfield
                      onChange={this.onChange}
                      label="Search"
                      name="search"
                      floatingLabel
                      value={this.state.searchTerm}
                    />
                    <Icon
                      name="close"
                      onClick={this.clearSearch}
                    />
                  </div>
                </form>
                {
                  documents &&
                    <Dashboard
                      allDocuments={documents}
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
                <FABButton colored ripple>
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

DashboardPage.propTypes = {
  fetchDocuments: PropTypes.func.isRequired,
  searchDocuments: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  allDocuments: PropTypes.object.isRequired,
  search: PropTypes.any.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    allDocuments: state.documents,
    search: state.search.documents
  }
};


export default connect(mapStateToProps, {
  fetchDocuments,
  searchDocuments
})(DashboardPage);

export {
  DashboardPage as DashboardPageComponent
};
