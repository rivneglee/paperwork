import textInput from './input/TextInput';
import combobox from './input/Combobox';
import richText from './input/RichText';
import VerticalList from './layout/VerticalList';
import HorizontalList from './layout/HorizontalList';

export enum InputItemTypes {
  RICH_TEXT = 'text', TEXT_INPUT = 'input', COMBOBOX = 'select',
}

export enum LayoutItemTypes {
  VERTICAL_LIST = 'vertical-list', HORIZONTAL_LIST = 'horizontal-list',
}

export const getInputMap = (commonProps: object = {}) => ({
  [InputItemTypes.RICH_TEXT]: { ...richText, defaultProps: { ...commonProps } },
  [InputItemTypes.TEXT_INPUT]: { ...textInput, defaultProps: { ...commonProps } },
  [InputItemTypes.COMBOBOX]: { ...combobox, defaultProps: { ...commonProps } },
});

export const getLayoutMap = () => ({
  [LayoutItemTypes.VERTICAL_LIST]: VerticalList,
  [LayoutItemTypes.HORIZONTAL_LIST]: HorizontalList,
});
