import React, { Component } from 'react';
import { Grid, Cell, Tabs, Tab } from 'react-mdl';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import docimage from '../../images/docman.jpg';
import RegisterForm from '../auth/RegisterForm';
import LoginForm from '../auth/LoginForm';
import * as userActions from '../../actions/userActions';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      user: true
    };
    this.setActiveTab = this.setActiveTab.bind(this);
  }

  setActiveTab(tabId) {
    this.setState({
      activeTab: tabId,
      user: tabId !== 1
    });
  }

  render() {
    return (
        <Grid>
        <Cell col={8}>
          <div>
            <img src={docimage} />
          </div>
        </Cell>
        <Cell col={4}>
          <div>
            <Tabs
              ripple
              activeTab={this.state.activeTab}
              onChange={this.setActiveTab}>
              <Tab className="signin-tab">
                Sign In</Tab>
              <Tab className="signup-tab">
                Sign Up</Tab>
            </Tabs>
            {this.state.user ?
            <section>
              <div className="content">
                <LoginForm userLogin={this.props.actions.userLogin} />
              </div>
            </section>
            :
            <section>
              <div className="content">
                <RegisterForm />
              </div>
            </section>
            }
          </div>
        </Cell>
      </Grid>
    );
  }
}

HomePage.propTypes = {
  actions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(userActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

