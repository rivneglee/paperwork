import PrettyUI from './TemplateListPage';
import SimpleUI from './_TemplateListPage';
import getProfile from '../../../../getProfile';

const { prettyUI } = getProfile();

export default prettyUI ? PrettyUI : SimpleUI;

export * from './TemplateListPage';
