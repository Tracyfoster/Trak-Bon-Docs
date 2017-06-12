import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Header, HeaderRow, Navigation, Textfield, IconButton } from 'react-mdl';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { searchUsers, searchDocuments } from '../../actions/searchActions';
import UserUpdate from '../userComponents/UserUpdate'

class NavBar extends Component {
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
    this.props.dispatch(searchUsers(term));
    this.props.dispatch(searchDocuments(term))
    .then(() => this.context.router.push(`/search/${term}`))
    .catch(error => {
      toastr.error(error);
    });
  }

  render () {
    return (
      <Header transparent>
        <HeaderRow title="Trak-Bon Docs">
          <Navigation>
            <a href="#"> API Docs </a>
          </Navigation>
        </HeaderRow>
      </Header>
    );
  }
}

NavBar.contextTypes = {
  router: PropTypes.object
};

NavBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(NavBar);