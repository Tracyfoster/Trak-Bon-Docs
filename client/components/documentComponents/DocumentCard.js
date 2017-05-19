import React, { Component } from 'react';
import { Card, CardText, CardActions, CardMenu,
  IconButton, Button, CardTitle } from 'react-mdl';
import PropTypes from 'prop-types';

class DocumentCard extends Component {
  render () {
    return (
      <Card shadow={0} style={{ width: '300px', margin: 'auto' }}>
        <CardTitle style={{ color: '#000', minHeight: '25px', fontSize: '15px' }}>
          Welcome
        </CardTitle>
        <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Mauris sagittis pellentesque lacus eleifend lacinia...
            tfeybjnm,'.Afec
            agfekjnmc,l.;feasczg.forEach(function(element)
              afwesdzdxxrgsre
              afsdx
            }, this);'
        </CardText>
        <CardActions border>
            <Button raised colored>Edit</Button> <span />
            <Button raised colored>Delete</Button> <span />
            <Button raised colored>Folder</Button>
        </CardActions>
      </Card>
    );
  }
}

// DocumentCard.propTypes = {
//   id: PropTypes.string.isRequired
// };

export default DocumentCard;