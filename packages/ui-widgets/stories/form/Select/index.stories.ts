import { storiesOf } from '@storybook/react';

import Default from './Default';
import MultipleSelect from './MultipleSelect';
import Disabled from './Disabled';

storiesOf('Select', module)
  .add('default', Default)
  .add('multipleSelect', MultipleSelect)
  .add('disabled', Disabled);
