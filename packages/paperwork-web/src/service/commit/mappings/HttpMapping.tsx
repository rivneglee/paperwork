import {
  LOAD_COMMIT_DETAIL,
  LOAD_COMMIT_LIST_BY_FORM,
  LOAD_COMMIT_LIST_BY_COMMITTER,
  CREATE_COMMIT,
} from '../intents';
import { Request } from '../../../integration';

const HttpMapping = {
  [LOAD_COMMIT_DETAIL]: ({ urlParams }: Request) => (
    `/api/forms/${urlParams.formId}/commits/${urlParams.commitId}`
  ),
  [CREATE_COMMIT]: ({ urlParams }: Request) => (
    `/api/forms/${urlParams.formId}/commits`
  ),
  [LOAD_COMMIT_LIST_BY_FORM]: ({ urlParams }: Request) => (
    `/api/forms/${urlParams.formId}/commits`
  ),
  [LOAD_COMMIT_LIST_BY_COMMITTER]: ({ urlParams }: Request) => (
  `/api/${urlParams.userId}/commits`
),
};

export default HttpMapping;
