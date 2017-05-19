import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import { Textfield, Button, RadioGroup, Radio } from 'react-mdl';
import PropTypes from 'prop-types';


class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = { editorHtml: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(html) {
    this.setState({ editorHtml: html });
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
                  floatingLabel
                  style={{ width: '300px' }}
                />
              </td>
              <td>
                <span>Document access level</span>
                <select id="access" name="access"
                style={{ display: 'block', width: '200px' }}>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="role">Role</option>
                </select>
              </td>
              <td style={{ textAlign: 'center', width: '200px' }}>
                <Button raised accent>Save</Button>
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ height: '200px', paddingBottom: '100px' }}>
        <ReactQuill
          theme={'snow'}
          onChange={this.handleChange}
          value={this.state.editorHtml}
          modules={Editor.modules}
          formats={Editor.formats}
          placeholder={this.props.placeholder}
        />
      </div>
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
};

export default Editor;