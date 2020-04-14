import Icons from '../../graphic/Icons';

export const actions = [
  { type: 'inline', label: 'B', style: 'BOLD', icon: Icons.Bold },
  { type: 'inline', label: 'I', style: 'ITALIC', icon: Icons.Italic },
  {
    type: 'entity',
    label: 'Link',
    style: 'link',
    entity: 'LINK',
    icon: Icons.Link,
  },
  { type: 'separator' },
  {
    type: 'block',
    label: 'UL',
    style: 'unordered-list-item',
    icon: Icons.UL,
  },
  {
    type: 'block',
    label: 'OL',
    style: 'ordered-list-item',
    icon: Icons.OL,
  },
  { type: 'block', label: 'H2', style: 'header-two', icon: Icons.H2 },
  {
    type: 'block',
    label: 'QT',
    style: 'blockquote',
    icon: Icons.BlockQuote,
  },
];
