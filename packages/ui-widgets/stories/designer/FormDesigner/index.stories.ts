import { storiesOf } from '@storybook/react';

import Form from './Form';
import Theme from './Theme';
import HeaderImage from './HeaderImage';

storiesOf('Form designer', module)
  .add('With modes', Form)
  .add('With theme', Theme)
  .add('With header image', HeaderImage);
