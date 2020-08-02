import PrettyUI from './CommitDetailPage';
import SimpleUI from './_CommitDetailPage';
import getProfile from '../../../../getProfile';

const { prettyUI } = getProfile();

export default prettyUI ? PrettyUI : SimpleUI;

export * from './CommitDetailPage';
