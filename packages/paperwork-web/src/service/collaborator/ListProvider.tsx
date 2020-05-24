import React, { ReactElement } from 'react';
import { LOAD_COLLABORATOR_LIST } from './intents';
import { User } from '../../schema/User';
import { Integration } from '../../integration';

export interface ListProviderState {
  collaborators: User[];
  list: (options?: ListOptions) => Promise<User[]>;
  isInitializing: boolean;
  isProcessing: boolean;
}

interface Props {
  children: (integrationState: ListProviderState) => ReactElement | null;
  integration: Integration;
  isProcessing: boolean;
}

export interface ListOptions {
  keyword?: string;
}

export default class extends React.Component<Props> {
  state = {
    collaborators: [],
  };

  private isInitializing = true;

  private list = async (options: ListOptions = {}) => {
    const { keyword } = options;
    const { integration } = this.props;
    const collaborators = await integration.send({
      intent: LOAD_COLLABORATOR_LIST,
      method: 'GET',
      params: {
        keyword,
      },
    });
    this.setState({
      collaborators,
    });
    return collaborators;
  }

  render() {
    const { collaborators = [] } = this.state;
    const { children, isProcessing } = this.props;
    return (
      children({
        collaborators,
        isProcessing,
        list: this.list,
        isInitializing: this.isInitializing,
      })
    );
  }
}
