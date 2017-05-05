import React, { Component } from 'react';
import LoginForm from './LoginForm';
import { Header, HeaderRow, Navigation, Textfield, Drawer } from 'react-mdl';


class NavBar extends Component{
  render () {
    return (
      <div>
        <Header waterfall>
          <HeaderRow title="Trak-Bon Docs">
            <Navigation>
              <LoginForm />
            </Navigation>
              <Textfield
                  value=""
                  onChange={() => {}}
                  label="Search2"
                  expandable
                  expandableIcon="search"
              />
          </HeaderRow>
        </Header>
        <Drawer title="Title">
            <Navigation>
                <LoginForm />
            </Navigation>
            <Textfield
                  value=""
                  onChange={() => {}}
                  label="Search2"
                  expandable
                  expandableIcon="search"
              />
        </Drawer>
      </div>
    );
  }
}

export default NavBar;