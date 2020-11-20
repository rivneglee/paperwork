import React, { ReactElement } from 'react';
import { LOAD_FORM_LIST } from './intents';
import { FormList } from '../../schema/Form';
import { Integration } from '../../integration';

export interface ListProviderState {
  formList: FormList;
  list: (options?: ListOptions, page?: number) => Promise<FormList>;
  isInitializing: boolean;
  isProcessing: boolean;
}

interface Props {
  children: (integrationState: ListProviderState) => ReactElement | null;
  integration: Integration;
  userId: string;
  isProcessing: boolean;
  preLoad?: boolean;
}

export interface ListOptions {
  keyword?: string;
}

export default class extends React.Component<Props> {
  state = {
    formList: {
      entries: [],
      pagination: { page: 0, total: 0 },
    },
  };

  private isInitializing = true;

  private list = async (options: ListOptions = {}, page = 0) => {
    const { keyword = '' } = options;
    const { integration, userId } = this.props;
    const formList = await integration.send({
      intent: LOAD_FORM_LIST,
      method: 'GET',
      urlParams: {
        userId,
      },
      params: {
        keyword,
        page,
        size: 20,
      },
    });
    this.setState({
      formList,
    });
    return formList;
  }

  async componentDidMount() {
    const { preLoad } = this.props;
    if (preLoad) {
      await this.list();
    }
    this.isInitializing = false;
  }

  render() {
    const { formList } = this.state;
    const { children, isProcessing } = this.props;
    return (
      children({
        isProcessing,
        formList,
        list: this.list,
        isInitializing: this.isInitializing,
      })
    );
  }
}
