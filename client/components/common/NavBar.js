import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, HeaderRow, Navigation, Textfield } from 'react-mdl';
import { connect } from 'react-redux';
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
    this.props.dispatch(searchDocuments(term));
    this.context.router.push(`/search/${this.state.searchTerm}`);
  }

  render () {
    return (
      <Header>
        <HeaderRow title="Trak-Bon Docs">
          <form method="post" onSubmit={this.onSubmit}>
            <Textfield
                value={this.state.searchTerm}
                onChange={this.onChange}
                label="Search"
                expandable
                expandableIcon="search"
            />
          </form>
        </HeaderRow>
      </Header>
    );
  }
}

NavBar.contextTypes = {
  router: PropTypes.object
};

NavBar.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(NavBar);