/** jsx */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogTitle, Textfield,
  DialogContent, DialogActions, IconButton } from 'react-mdl';
import { deleteDocument } from '../../actions/documentActions';

class DocumentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: document.content,
      title: document.title
    };
    this.onChange = this.onChange.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  onChange(event) {
    const field = event.target.name;
  }

  onUpdate() {
    this.context.router.push('/manageusers');
  }

  onDelete() {
    alert('Are you sure you want to delete this?');
    this.props.dispatch(deleteDocument(this.props.document.id));
    this.handleCloseDialog();
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
        <Button onClick={this.handleOpenDialog} ripple colored raised
          style={{ color: '#fff' }}>Read</Button>
        <Dialog
          open={this.state.openDialog}
          onCancel={this.handleCloseDialog}
          style={{ width: '750px' }}>
          <IconButton raised colored name="close"
            onClick={this.handleCloseDialog} />
          <DialogTitle
            style={{ fontSize: '25px' }} >
            {this.props.document.title}</DialogTitle>
          <DialogContent>
            <p>{this.props.document.content}</p>
          </DialogContent>
          <DialogActions>
            <Button
              ripple raised colored
              type="submit"
              onClick={this.onUpdate}>
              Update</Button>
            <Button
              ripple raised colored
              type="submit"
              onClick={this.onDelete}>
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
  dispatch: PropTypes.func.isRequired,
  document: PropTypes.object.isRequired
};

export default connect()(DocumentView);