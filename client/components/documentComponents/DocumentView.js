/** jsx */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton } from 'react-mdl';
import toastr from 'toastr';
import { deleteDocument } from '../../actions/documentActions';

class DocumentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: document.content,
      title: document.title,
      openDialog: false
    };

    this.onUpdate = this.onUpdate.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }


  onUpdate() {
    this.context.router.push(`/editor/${this.props.document.id}`);
  }

  onDelete() {
    alert('Are you sure you want to delete this?');
    this.props.deleteDocument(this.props.document.id)
    .then(() => toastr.success('Document has been deleted'))
    .catch((error) => {
      toastr.error(error);
    });
    this.handleCloseDialog();
  }

  getContent() {
    return { __html: this.props.document.content };
  }

  handleOpenDialog() {
    this.setState({
      openDialog: true
    });
  }

  handleCloseDialog() {
    this.setState({
      openDialog: false
    });
  }

  render() {
    return (
      <div>
        <Button
          onClick={this.handleOpenDialog}
          ripple
          className="read-button"
          colored
          raised
          style={{ color: '#fff' }}
        > Read </Button>
        <Dialog
          open={this.state.openDialog}
          onCancel={this.handleCloseDialog}
          style={{ width: '750px' }}
        >
          <IconButton
            raised
            colored
            className="close-read-button"
            name="close"
            onClick={this.handleCloseDialog}
          />
          <DialogTitle
            style={{ fontSize: '25px' }}
          >
            {this.props.document.title}</DialogTitle>
          <DialogContent>
            <p dangerouslySetInnerHTML={this.getContent()} />
          </DialogContent>
          <DialogActions>
            <Button
              ripple
              className="update-button"
              raised
              colored
              type="submit"
              onClick={() => this.onUpdate()}
            >
            Update</Button>
            <Button
              ripple
              className="delete-button"
              raised
              colored
              onClick={() => this.onDelete()}
            >
            Delete</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
 }

DocumentView.contextTypes = {
  router: PropTypes.object
};

DocumentView.propTypes = {
  deleteDocument: PropTypes.func.isRequired,
  document: PropTypes.object.isRequired
};

export default connect(null, { deleteDocument })(DocumentView);

export {
  DocumentView as DocumentViewComponent
};
