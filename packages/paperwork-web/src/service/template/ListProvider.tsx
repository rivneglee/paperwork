import React, { ReactElement } from 'react';
import { LOAD_TEMPLATE_LIST } from './intents';
import { TemplateList } from '../../schema/Template';
import { Integration } from '../../integration';

export interface ListProviderState {
  templateList: TemplateList;
  list: (options?: ListOptions) => Promise<TemplateList>;
  isInitializing: boolean;
}

interface Props {
  children: (integrationState: ListProviderState) => ReactElement | null;
  integration: Integration;
  userId: string;
}

export interface ListOptions {
  keyword?: string;
  visibility?: 'private' | 'protected' | 'public' | 'all';
}

export default class extends React.Component<Props> {
  state = {
    templateList: [],
  };

  private isInitializing = true;

  private list = async (options: ListOptions = {}) => {
    const { keyword, visibility = 'private' } = options;
    const { integration, userId } = this.props;
    const templateList = await integration.send({
      intent: LOAD_TEMPLATE_LIST,
      method: 'GET',
      urlParams: {
        userId,
      },
      params: {
        keyword,
        visibility,
      },
    });
    this.setState({
      templateList,
    });
    return templateList;
  }

  async componentDidMount() {
    this.isInitializing = false;
    await this.list();
  }

  render() {
    const { templateList = [] } = this.state;
    const { children } = this.props;
    return (
      children({
        templateList,
        list: this.list,
        isInitializing: this.isInitializing,
      })
    );
  }
}
