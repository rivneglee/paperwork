import React, { ReactElement } from 'react';
import { Integration } from '../../integration';
import { CREATE_COMMIT, LOAD_COMMIT_DETAIL } from './intents';
import { CommitDetail } from '../../schema/Commit';
import { SucceedMessage } from '../../schema/Form';

export interface DetailProviderState {
  commit?: CommitDetail;
  load: () => Promise<CommitDetail>;
  create: (commit: CommitDetail) => Promise<SucceedMessage>;
  isInitializing: boolean;
  isProcessing: boolean;
}

interface Props {
  formId: string;
  commitId: string;
  children: (integrationState: DetailProviderState) => ReactElement | null;
  integration: Integration;
  isProcessing: boolean;
  preLoad?: boolean;
}

export default class extends React.Component<Props> {
  private isInitializing = true;

  state = {
    commit: undefined,
  };

  private load = async () => {
    const { formId, commitId } = this.props;
    const { integration } = this.props;
    const commit = await integration.send({
      intent: LOAD_COMMIT_DETAIL,
      method: 'GET',
      urlParams: {
        formId,
        commitId,
      },
    });
    this.setState({
      commit,
    });
    return commit;
  }

  private create = async (commit: CommitDetail) => {
    const { formId } = this.props;
    const { integration } = this.props;
    const succeedMessage = await integration.send({
      intent: CREATE_COMMIT,
      method: 'POST',
      urlParams: {
        formId,
      },
      content: {
        values: commit.values,
        sourceFormId: formId,
      },
    });
    this.setState({
      commit,
    });
    return succeedMessage;
  }

  async componentDidMount() {
    this.isInitializing = false;
    const { preLoad } = this.props;
    if (preLoad) {
      await this.load();
    }
  }

  async componentDidUpdate(prevProps: Props) {
    const { commitId, preLoad } = this.props;
    const shouldLoad = (commitId !== prevProps.commitId);

    if (preLoad && shouldLoad) {
      await this.load();
    }
  }

  render() {
    const { commit } = this.state;
    const { children, isProcessing } = this.props;
    return (
      children({
        commit,
        isProcessing,
        create: this.create,
        load: this.load,
        isInitializing: this.isInitializing,
      })
    );
  }
}
