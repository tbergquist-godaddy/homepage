// @flow

import * as React from 'react';
import Layout from '@theme/Layout';

import AboutMe from '../../docs/aboutme.md';

export default function Home() /* :React.Node */ {
  return (
    <Layout>
      <div className="container">
        <AboutMe />
      </div>
    </Layout>
  );
}
