import PrettyUI from './FormListPage';
import SimpleUI from './_FormListPage';
import getProfile from '../../../../getProfile';

const { prettyUI } = getProfile();

export default prettyUI ? PrettyUI : SimpleUI;

export * from './FormListPage';
