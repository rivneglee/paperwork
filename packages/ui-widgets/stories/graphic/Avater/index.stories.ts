import { storiesOf } from '@storybook/react';

import Default from './Default';
import WithCustomCSS from './WithCustomCSS';
import WithShadowEffect from './WithShadowEffect';

storiesOf('Avater', module)
  .add('default', Default)
  .add('withShadowEffect', WithShadowEffect)
  .add('withCustomCSS', WithCustomCSS)
