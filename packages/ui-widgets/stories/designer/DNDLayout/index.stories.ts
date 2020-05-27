import { storiesOf } from '@storybook/react';

import DraggableList from './DraggableList';
import Page from './Page';

storiesOf('Designer', module)
  .add('Draggable List', DraggableList)
  .add('Page', Page);
