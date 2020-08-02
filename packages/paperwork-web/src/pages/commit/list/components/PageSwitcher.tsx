import PrettyUI from './CommitListPage';
import SimpleUI from './_CommitListPage';
import getProfile from '../../../../getProfile';

const { prettyUI } = getProfile();

export default prettyUI ? PrettyUI : SimpleUI;

export * from './CommitListPage';
