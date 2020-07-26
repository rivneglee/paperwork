import React, { ReactElement } from 'react';
import { LOAD_COMMIT_LIST_BY_COMMITTER } from './intents';
import { CommitList } from '../../schema/Commit';
import { Integration } from '../../integration';

export interface ListProviderState {
  commitList: CommitList;
  isInitializing: boolean;
  isProcessing: boolean;
  list: (options?: ListOptions,  page?: number) => Promise<CommitList>;
}

interface Props {
  userId: string;
  children: (integrationState: ListProviderState) => ReactElement | null;
  integration: Integration;
  isProcessing: boolean;
  preLoad?: boolean;
}

export interface ListOptions {
  keyword?: string;
  committerId?: string;
  formId?: string;
}

export default class extends React.Component<Props> {
  state = {
    commitList: {
      entries: [],
      pagination: { page: 0, total: 0 },
    },
  };

  private isInitializing = true;

  private list = async (options: ListOptions = {}, page = 0) => {
    const { integration, userId } = this.props;
    const { committerId, formId, keyword } = options;
    // const intent = committerId ? LOAD_COMMIT_LIST_BY_COMMITTER : LOAD_COMMIT_LIST_BY_FORM;
    const commitList = await integration.send({
      intent: LOAD_COMMIT_LIST_BY_COMMITTER,
      method: 'GET',
      urlParams: {
        userId,
      },
      params: {
        committerId,
        formId,
        keyword,
        page,
        size: 50,
      },
    });
    this.setState({
      commitList,
    });
    return commitList;
  }

  async componentDidMount() {
    const { preLoad } = this.props;
    this.isInitializing = false;
    if (preLoad) {
      await this.list();
    }
  }

  render() {
    const { commitList } = this.state;
    const { children, isProcessing } = this.props;
    return (
      children({
        isProcessing,
        commitList,
        list: this.list,
        isInitializing: this.isInitializing,
      })
    );
  }
}
