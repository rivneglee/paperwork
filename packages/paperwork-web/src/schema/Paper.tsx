import { FormProps, FormThemeColors } from '@paperwork/ui-widgets';

export enum PaperType {
  FORM = 'form', REPORT = 'report',
}

export interface Paper {
  id: string;
  name: string;
  type: PaperType;
  heroImage: string;
  theme?: FormThemeColors;
}

export interface PaperAppearance extends FormProps {}
