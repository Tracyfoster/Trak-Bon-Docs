import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import { connect } from 'react-redux';
import { Textfield, Button } from 'react-mdl';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { saveDocument, updateDocument } from '../../actions/documentActions';


class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      access: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    if (this.props.params.id) {
      const docId = parseInt(this.props.params.id);
      const userDoc = this.props.documents.data.filter(document => document.id === docId)[0]
      this.setState({
        title: userDoc.title,
        content: userDoc.content,
        access: userDoc.access,
        userId: userDoc.userId
      });
    }
  }

  onChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.state.userId) {
      this.props.dispatch(updateDocument(this.state))
      .then(() => this.context.router.push('/documents'))
      .catch((error) => {
        toastr.error(error);
      });
    } else {
      const { title, content, access } = this.state;
      const userId = this.props.auth.id
      const data = {
        title,
        content,
        access,
        userId
      };
      this.props.dispatch(saveDocument(data))
      .then(() => this.context.router.push('/documents'))
      .catch((error) => {
        toastr.error(error);
      });
    }
  }

  handleChange(html) {
    this.setState({ content: html });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <Textfield
                  label="Document Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  floatingLabel required
                  style={{ width: '250px' }}
                />
              </td>
              <td>
                <span />
              </td>
              <td>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder"
                    style={{ width: '250px' }} >
                <select className="mdl-textfield__input" id="access" name="access" required
                  value={this.state.access} onChange={this.onChange} >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="reviewers">Reviewers</option>
                  <option value="writers">Writers</option>
                </select>
                <label className="mdl-textfield__label"
                       htmlFor="access">Document Access</label>
              </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div>
        <ReactQuill
          theme={'snow'}
          value={this.state.content}
          onChange={this.handleChange}
          modules={Editor.modules}
          formats={Editor.formats}
          placeholder={this.props.placeholder}
        />
      </div>
      <span />
       <Button raised colored>Save</Button>
      </form>
    </div>
    );
  }
}

/*
 * Quill modules to attach to editor
 * See http://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }, { font: [] }, { size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' },
     { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['clean']
  ]
};
/*
 * Quill editor formats
 * See http://quilljs.com/docs/formats/
 */
Editor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
];

/*
 * PropType validation
 */
Editor.propTypes = {
  placeholder: PropTypes.string,
  title: PropTypes.string,
  role: PropTypes.number,
};

Editor.contextTypes = {
  router: PropTypes.object
};

Editor.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.object,
  documents: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth.user,
    documents: state.documents.userDocuments
  }
}
export default connect(mapStateToProps)(Editor);