import PrettyUI from './FormDetailPage';
import SimpleUI from './_FormDetailPage';
import getProfile from '../../../../getProfile';

const { prettyUI } = getProfile();

export default prettyUI ? PrettyUI : SimpleUI;

export * from './FormDetailPage';
