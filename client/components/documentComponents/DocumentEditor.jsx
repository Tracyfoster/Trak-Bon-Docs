import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';
import Editor from './Editor';

class DocumentEditor extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Cell col={1}>
            <span />
          </Cell>
          <Cell col={9} className="add-document-form">
            <Editor
              placeholder={'Write something...'}
              style={{ height: '200px' }}
              params={this.props.params}
            />
          </Cell>
        </Grid>
      </div>
    );
  }
}

export default DocumentEditor;
