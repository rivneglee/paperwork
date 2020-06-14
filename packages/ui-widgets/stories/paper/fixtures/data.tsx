import { LayoutNodeTypes } from '../../../src/paper/Form';

export const layout = [
  { id: 'page1', childRefs: ['list1', 'list2'], type:  LayoutNodeTypes.PAGE },
  { id: 'list1', childRefs: ['item1', 'item2'], type:  LayoutNodeTypes.SIMPLE_LIST },
  { id: 'item1', childRefs: [], type:  LayoutNodeTypes.FORM_ITEM },
  { id: 'item2', childRefs: [], type:  LayoutNodeTypes.FORM_ITEM },
  { id: 'list2', childRefs: [], type:  LayoutNodeTypes.SIMPLE_LIST },
];

export const items = {
  item1: { id: 'item1', itemType: 'input', value: 'I am item 1' },
  item2: { id: 'item2', itemType: 'select', selectedValue: ['r', 'g'], isMultipleSelect: true, options: [
      { value: 'r', label: 'Red' },
      { value: 'g', label: 'Green' },
      { value: 'b', label: 'Blue' },
  ]},
};
