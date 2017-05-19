import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DocumentList from './DocumentList';
import Dashboard from './Dashboard';
import DocumentCard from './DocumentCard';
import { fetchDocuments, fetchUserDocuments, deleteDocument } from '../../actions/documentActions';

class DocumentPage extends Component {
  componentDidMount() {
    this.props.fetchDocuments();
    // this.props.fetchUserDocuments();
  }

  render() {
    return (
      <div>
        <div>
          { this.props.documents ?
          <Dashboard
            dashboard={this.props.dashboard}
          />
          : <span/>
          }
        </div>
        <div>
          {/*{ this.props.documents ?
          <DocumentCard userDocuments={this.props.userDocuments}/>
          : <span/>
          }*/}

          <h4>Documents List</h4>
          { this.props.documents ?
          <DocumentList
            documents={this.props.documents}
            deleteDocument={this.props.deleteDocument}
          />
          : <span/>
          }
        </div>
      </div>
    );
  }
}

DocumentPage.propTypes = {
  documents: PropTypes.array.isRequired,
  dashboard: PropTypes.array.isRequired,
  // userDocuments: PropTypes.array.isRequired,
  fetchDocuments: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  // fetchUserDocuments: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  console.log('docpage', state);
  return {
    documents: state.documents.data || [],
    userDocuments: state.documents.userDocuments || [],
    dashboard: [state.documents.public, state.documents.private,
      state.documents.role]
    // currentUser: state
  };
}

export default connect(mapStateToProps,
{ fetchDocuments, deleteDocument })(DocumentPage);