import { FormProps, FormThemeColors } from '@paperwork/ui-widgets';

export interface Paper {
  id: string;
  name: string;
  heroImage: string;
  theme?: FormThemeColors;
}

export interface PaperAppearance extends FormProps {}
