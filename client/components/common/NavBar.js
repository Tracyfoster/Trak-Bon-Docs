import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Header, HeaderRow, Navigation, IconButton } from 'react-mdl';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { searchUsers, searchDocuments } from '../../actions/searchActions';

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
    .catch((error) => {
      toastr.error(error);
    });
  }

  render() {
    return (
      <Header transparent>
        <HeaderRow title="Trak-Bon Docs">
          <Navigation>
            <Link href="#"> API Docs </Link>
            {this.props.auth.isAuthenticated ?
              <a id="signout" href={this.signout}>
                <IconButton colored name="verified_user" />
                <span> Sign Out </span>
              </a>
            :
              <span />
            }
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

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(NavBar);
