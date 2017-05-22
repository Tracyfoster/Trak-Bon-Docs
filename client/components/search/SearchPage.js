import React, { Component } from 'react';
import { Tabs, Tab, Grid, Cell } from 'react-mdl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchUsers, searchDocuments } from '../../actions/searchActions';
import UserSearch from './UserSearch';
import DocumentSearch from './DocumentSearch';

class SearchPage extends Component {
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
        <Cell col={1}>
          <span />
        </Cell>
        <Cell col={11}>
          <Tabs
            ripple
            activeTab={this.state.activeTab}
            onChange={this.setActiveTab}>
            <Tab>
              Document Search</Tab>
            <Tab>
              User Search</Tab>
          </Tabs>
          {this.state.user ?
          <section>
            <div className="content">
              <DocumentSearch documentResults={this.props.documentResults}/>
            </div>
          </section>
          :
          <section>
            <div className="content">
              <UserSearch userResults={this.props.userResults}/>
            </div>
          </section>
          }
        </Cell>
      </Grid>
    );
  }
}

SearchPage.propTypes = {
  userResults: PropTypes.array.isRequired,
  documentResults: PropTypes.array.isRequired,
  searchUsers: PropTypes.func.isRequired,
  searchDocuments: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    userResults: state.search.users.users || [],
    documentResults: state.search.documents.documents || [],
    auth: state.auth
  };
}

export default connect(mapStateToProps,
{ searchUsers, searchDocuments })(SearchPage);