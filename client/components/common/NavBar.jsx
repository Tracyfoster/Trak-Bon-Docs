import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Header, HeaderRow, Navigation, Button } from 'react-mdl';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { logoutUser } from '../../actions/userActions';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.signout = this.signout.bind(this);
  }

  signout(event) {
    event.preventDefault();
    this.props.logoutUser()
      .then(() => localStorage.removeItem('jwtToken'));
    this.context.router.push('/');
  }
  render() {
    return (
      <Header>
        <HeaderRow title="Trak-Bon Docs">
          <Navigation>
            <Link href="#" className="api-docs-links"> API Docs </Link>
          </Navigation>
          <Navigation>
            {
              this.props.auth.isAuthenticated &&
                <Button
                  className="signout-button"
                  ripple
                  raised
                  colored
                  onClick={this.signout}
                >
                  Sign Out
                </Button>
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
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  logoutUser
})(NavBar);
