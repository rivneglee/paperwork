import { storiesOf } from '@storybook/react';

import Default from './Default';
import WithHeaderAndFooter from './WithHeaderAndFooter';

storiesOf('Card', module)
  .add('default', Default)
  .add('withHeaderAndFooter', WithHeaderAndFooter);
