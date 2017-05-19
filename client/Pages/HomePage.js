import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import docimage from '../images/docman.jpg';
import RegisterForm from '../components/auth/RegisterForm';
import * as userActions from '../actions/userActions';

class HomePage extends Component {
  render() {
    return (
        <Grid>
        <Cell col={8}>
          <div>
            <img src={docimage} />
          </div>
        </Cell>
        <Cell col={4}>
          <RegisterForm registerUser={this.props.actions.registerUser} />
        </Cell>
      </Grid>
    );
  }
}

HomePage.propTypes = {
  actions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

