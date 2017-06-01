import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import { connect } from 'react-redux';
import { Textfield, Button, RadioGroup, Radio } from 'react-mdl';
import PropTypes from 'prop-types';
import { saveDocument } from '../../actions/documentActions';


class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      access: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(html) {
    this.setState({ content: html, });
  }

  onChange(event) {
    const value = event.target.value;
    const field = event.target.name;
    this.setState({ [field]: value });
  }

  onSubmit(event) {
    event.preventDefault();
    const { title, content, access } = this.state;
    const userId = this.props.auth.id
    const data = {
      title,
      content,
      access,
      userId
    };
    console.log('datatosave', data)
    this.props.dispatch(saveDocument(data))
    .then(() => this.context.router.push('/dashboard'))
    .catch(error => console.log('Getting better', error));
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <Textfield
                  label="Document Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  floatingLabel
                  style={{ width: '250px' }}
                />
              </td>
              <td>
                <span />
              </td>
              <td>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
                    style={{ width: '250px' }} >
                <select className="mdl-textfield__input" id="role" name="access"
                  onChange={this.onChange} value={this.state.access}>
                  <option />
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="reviewers">Reviewers</option>
                  <option value="writers">Writers</option>
                </select>
                <label className="mdl-textfield__label"
                       htmlFor="access">Role</label>
              </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div>
        <ReactQuill
          theme={'snow'}
          onChange={this.handleChange}
          value={this.state.content}
          modules={Editor.modules}
          formats={Editor.formats}
          placeholder={this.props.placeholder}
        />
      </div>
       <Button raised colored
       style={{marginBottom: '5px'}}
       onClick={this.onSubmit}>Save</Button>
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
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth.user
  }
}
export default connect(mapStateToProps)(Editor);