import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Header, HeaderRow, Navigation, Textfield, Drawer } from 'react-mdl';
import LoginForm from '../auth/LoginForm';
import * as userActions from '../../actions/userActions';


class NavBar extends Component {
  render () {
    return (
      <Header>
        <HeaderRow title="Trak-Bon Docs">
          <Navigation>
            <LoginForm userLogin={this.props.actions.userLogin} />
          </Navigation>
            <Textfield
                value=""
                onChange={() => {}}
                label="Search"
                expandable
                expandableIcon="search"
            />
        </HeaderRow>
      </Header>
    );
  }
}

NavBar.propTypes = {
  actions: PropTypes.object.isRequired
};

// const mapStateToProps = (state) => {
//   return {
//     user: state.user
//   };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(NavBar);