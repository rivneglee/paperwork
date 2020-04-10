import { storiesOf } from '@storybook/react';

import Default from './Default';
import WithAlignment from './WithAlignment';
import WithIcons from './WithIcons';

storiesOf('Dropdown', module)
  .add('default', Default)
  .add('withAlignment', WithAlignment)
  .add('withIcons', WithIcons);
