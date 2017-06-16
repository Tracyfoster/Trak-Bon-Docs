/** jsx */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Footer, FooterSection, FooterLinkList } from 'react-mdl';


class FootBar extends Component {
  render() {
    return (
      <Footer size="mini">
        <FooterSection type="left" logo="Trak-Bon Docs">
          <FooterLinkList>
            <Link to="/help">Help</Link>
            <Link href="/docs">API Docs</Link>
          </FooterLinkList>
        </FooterSection>
      </Footer>
    );
  }
}

export default FootBar;
