import React, { Component } from 'react';
import { Header, HeaderRow, Navigation, Textfield } from 'react-mdl';

class NavBar extends Component {
  render () {
    return (
      <Header>
        <HeaderRow title="Trak-Bon Docs">
          <Textfield
              value=""
              onChange={() => {}}
              label="Search"
              expandable
              expandableIcon="search"
          />
        </HeaderRow>
      </Header>
    );
  }
}

export default NavBar;