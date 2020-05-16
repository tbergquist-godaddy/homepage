// @flow

import * as React from 'react';
import { Redirect } from '@docusaurus/router';

export default function Home() /* :React.Node */ {
  return <Redirect to="/docs/aboutme" />;
}
