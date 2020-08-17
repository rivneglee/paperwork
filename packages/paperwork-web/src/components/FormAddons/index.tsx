import textInput from './input/TextInput';
import combobox from './input/Combobox';
import richText from './input/RichText';
import VerticalList from './layout/VerticalList';
import HorizontalList from './layout/HorizontalList';
import submitButton from './button/Submit';
import table from './statistic/Table';

export enum InputItemTypes {
  RICH_TEXT = 'text', TEXT_INPUT = 'input', COMBOBOX = 'select',
}

export enum StatisticItemTypes {
  TABLE = 'data-table',
}

export enum ButtonItemTypes {
  SUBMIT = 'submit',
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

export const getStatisticMap = () => ({
  [StatisticItemTypes.TABLE]: { ...table, defaultProps: {} },
});

export const getButtonMap = (commonProps: object = {}) => ({
  [ButtonItemTypes.SUBMIT]: { ...submitButton, defaultProps: { label: 'Submit', ...commonProps } },
});
