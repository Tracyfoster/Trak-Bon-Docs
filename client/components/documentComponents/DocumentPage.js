import React, { Component } from 'react';
import { Grid, Cell, FABButton, Icon, Textfield, IconButton } from 'react-mdl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as documentActions from '../../actions/documentActions'
import UserDocuments from '../documentComponents/UserDocuments';
import { isAdmin } from '../../utils/Utils';

class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const term = this.state.searchTerm;
    this.props.actions.searchDocuments(term);
  }

  componentWillMount() {
    const userId = this.props.auth.user.id;
    this.props.actions.fetchUserDocuments(userId);
  }

  render() {
    const searchResult = this.props.search;
    const documents = searchResult.totalItems > 0 ? searchResult : this.props.allDocuments;
    return (
      <div>
        {this.props.auth.isAuthenticated ?
        <Grid>
          <Cell col={11}>
            <div>
              <form method="post" onSubmit={this.onSubmit}>
                <span>
                <Textfield
                  onChange={this.onChange}
                  label="Search"
                  name="search"
                  floatingLabel
                  value={this.state.searchTerm}
                  style={{ width: '500px' }}
                />
                <IconButton raised colored name="close"
                onClick={this.clearSearch} />
                </span>
              </form>

               { this.props.userDocuments ?
              <UserDocuments
              userDocuments={this.props.userDocuments}
              auth={this.props.auth}
              actions={this.props.actions}
              />
              : <span/>
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
  actions: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  userDocuments: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  console.log('state', state)
  return {
    auth: state.auth,
    userDocuments: state.documents.userDocuments,
    search : state.search.documents || []
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(documentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
