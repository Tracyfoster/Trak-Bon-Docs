import React, { Component } from 'react';
import { Tabs, Tab, Textfield } from 'react-mdl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

  componentWillMount() {
    this.props.searchUsers();
    this.props.searchDocuments();
  }

  setActiveTab(tabId) {
    if (tabId === 1) {
      this.setState({
        activeTab: tabId,
        user: false
      });
    } else {
      this.setState({
        activeTab: tabId,
        user: true
      });
    }
  }


  render() {
    return (
      <div>
        <div>
          <Textfield
          value=""
          onChange={() => {}}
          label="Search"
          expandableIcon="search"
          style={{ width: '200px' }}
          />
        </div>
        <Tabs
          ripple
          activeTab={this.state.activeTab}
          onChange={this.setActiveTab}>
          <Tab>
            User Search</Tab>
          <Tab>
            Document Search</Tab>
        </Tabs>
        {this.state.user ?
        <section>
          <div className="content">
            <UserSearch userResults={this.props.userResults}/>
          </div>
        </section>
        :
        <section>
          <div className="content">
            <DocumentSearch documentResults={this.props.documentResults}/>
          </div>
        </section>
        }
      </div>
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