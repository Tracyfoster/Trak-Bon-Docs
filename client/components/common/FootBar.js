/** jsx */
import React, { Component } from 'react';
import { Footer, FooterSection, FooterLinkList } from 'react-mdl';


class FootBar extends Component {
  render() {
    return (
      <Footer size="mini">
        <FooterSection type="left" logo="Trak-Bon Docs">
          <FooterLinkList>
            <a href="#">Help</a>
            <a href="#">API Docs</a>
          </FooterLinkList>
        </FooterSection>
      </Footer>
    );
  }
}

export default FootBar;