import React, { Component } from 'react';
import { Grid, Cell, FABButton, Icon, Textfield, IconButton } from 'react-mdl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import * as documentActions from '../../actions/documentActions'
import UserDocuments from '../documentComponents/UserDocuments';
import { isAdmin } from '../../utils/Utils';

class DocumentPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      documents: Object.assign({}, props.userDocuments)
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.search !== this.props.search ||
      this.props.userDocuments !== nextProps.userDocuments) {
        const documents = nextProps.search.totalItems > 0 ?
          nextProps.search : nextProps.userDocuments;

      this.setState({ documents: Object.assign({}, documents) });
    }
  }

  onChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const term = this.state.searchTerm;
    this.props.actions.searchDocuments(term)
    .then(() => {
      toastr.success('Successful')
    })
    .catch(error => {
      toastr.error(error);
    });
  }

  clearSearch() {
    this.setState({
      searchTerm: '',
      documents: Object.assign({}, this.props.userDocuments)
    });
  }

  componentWillMount() {
    const userId = this.props.auth.user.id;
    this.props.actions.fetchUserDocuments(userId)
    .then(() => toastr.success('Successful'))
    .catch(error => {
      toastr.error(error);
    });
  }

  render() {
    const documents = this.state.documents;
    console.log('docs', documents)
    return (
      <div>
        {this.props.auth.isAuthenticated ?
        <Grid>
          <Cell col={2}>
            <span />
          </Cell>
          <Cell col={9}>
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
                <Icon name="close"
                onClick={this.clearSearch} />
                </span>
              </form>

               {documents ?
              <UserDocuments
              userDocuments={documents}
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

DocumentPage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(DocumentPage);
