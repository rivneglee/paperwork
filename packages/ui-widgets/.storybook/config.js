import { configure } from '@storybook/react';

import '../../ui-styles/src/index.scss';

function loadStories() {
  const imports = require.context('../stories', true, /(\.stories\.ts)$/);
  imports.keys().forEach(story => imports(story));
}

configure(loadStories, module);
