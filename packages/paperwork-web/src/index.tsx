import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import { Card } from '@paperwork/ui-widgets';

ReactDOM.render(<div>Paperwork<Card /></div>,
  document.body as HTMLElement,
);

registerServiceWorker();
