// @flow

import * as React from 'react';

/*:: 
type Props = {
  +src: string,
  +alt: string,
}; */

export default function Image({ alt, ...rest } /* : Props */) /* : React.Element<'img'> */ {
  return <img alt={alt} {...rest} />;
}
