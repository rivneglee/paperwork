import { CompositeDecorator, ContentBlock, ContentState } from 'draft-js';
import Link from './Link';

const createTypeStrategy = (type: string) => {
  return (contentBlock: ContentBlock,
          callback: (start: number, end: number) => void,
          contentState: ContentState) => {
    contentBlock.findEntityRanges((character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === type
      );
    },                            callback);
  };
};

const decorator = new CompositeDecorator([
  {
    strategy: createTypeStrategy('LINK'),
    component: Link,
  },
]);

export default decorator;
