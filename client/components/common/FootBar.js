/** jsx */
import React from 'react';
import { Link } from 'react-router';
import { Footer, FooterSection, FooterLinkList } from 'react-mdl';


const FootBar = () => (
  <Footer size="mini">
    <FooterSection type="left" logo="Trak-Bon Docs">
      <FooterLinkList>
        <Link to="/help">Help</Link>
        <Link href="/docs">API Docs</Link>
      </FooterLinkList>
    </FooterSection>
  </Footer>
  );

export default FootBar;
