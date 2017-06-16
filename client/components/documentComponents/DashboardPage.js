import React, { Component } from 'react';
import { Grid, Cell, FABButton, Icon, Textfield } from 'react-mdl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
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
  }

  componentWillMount() {
    this.props.fetchDocuments();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.search !== this.props.search ||
      this.props.allDocuments !== nextProps.allDocuments) {
      const documents = nextProps.search.totalItems > 0 ?
          nextProps.search : nextProps.allDocuments;

      this.setState({ documents: Object.assign({}, documents) });
    }
  }

  onChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const term = this.state.searchTerm;
    this.props.searchDocuments(term);
  }

  clearSearch() {
    this.setState({
      searchTerm: '',
      documents: Object.assign({}, this.props.allDocuments)
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
                <form className="dashboard-form" onSubmit={e => this.onSubmit(e)}>
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
                      name="close"
                      onClick={this.clearSearch}
                    />
                  </span>
                </form>
                { documents ?
                  <Dashboard
                    allDocuments={documents}
                    auth={this.props.auth}
                  />
                : <span />
                }
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
  search: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  allDocuments: state.documents,
  search: state.search.documents || []
});


export default connect(mapStateToProps, {
  fetchDocuments,
  searchDocuments
})(DashboardPage);

export {
  DashboardPage as DashboardPageComponent
};
