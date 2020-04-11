import { storiesOf } from '@storybook/react';

import Default from './Default';
import WithPlacement from './WithPlacement';

storiesOf('Drawer', module)
  .add('default', Default)
  .add('withPlacement', WithPlacement);
