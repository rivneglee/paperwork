import { storiesOf } from '@storybook/react';

import Default from './Default';
import WithTooltip from './WithTooltip';

storiesOf('Quick add', module)
  .add('default', Default)
  .add('WithTooltip', WithTooltip);
