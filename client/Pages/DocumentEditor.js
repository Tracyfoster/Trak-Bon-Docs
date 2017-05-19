import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';
import Editor from '../components/documentComponents/Editor';

class DocumentEditor extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Cell col={8} style={{ height: '200px', paddingTop: '100px' }}>
            <Editor placeholder={'Write something...'}
              style={{ height: '200px', padding: '300px' }}
              />
          </Cell>
        </Grid>
      </div>
    );
  }
}

export default DocumentEditor;
