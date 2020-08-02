import PrettyUI from './TemplateDetailPage';
import SimpleUI from './_TemplateDetailPage';
import getProfile from '../../../../getProfile';

const { prettyUI } = getProfile();

export default prettyUI ? PrettyUI : SimpleUI;

export * from './TemplateDetailPage';
