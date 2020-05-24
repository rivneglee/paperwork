import React, { ReactElement } from 'react';
import { LOAD_DATASOURCE_LIST } from './intents';
import { DataSourceList } from '../../schema/DataSource';
import { Integration } from '../../integration';

export interface ListProviderState {
  dataSourceList: DataSourceList;
  list: (options?: ListOptions) => Promise<DataSourceList>;
  isInitializing: boolean;
  isProcessing: boolean;
}

interface Props {
  children: (integrationState: ListProviderState) => ReactElement | null;
  onLoadList?: (dataSourceList: DataSourceList) => void;
  integration: Integration;
  userId: string;
  isProcessing: boolean;
}

export interface ListOptions {
  keyword?: string;
}

export default class extends React.Component<Props> {
  state = {
    dataSourceList: [],
  };

  private isInitializing = true;

  private list = async (options: ListOptions = {}) => {
    const { keyword } = options;
    const { integration, userId } = this.props;
    const dataSourceList = await integration.send({
      intent: LOAD_DATASOURCE_LIST,
      method: 'GET',
      urlParams: {
        userId,
      },
      params: {
        keyword,
      },
    });
    this.setState({
      dataSourceList,
    });
    return dataSourceList;
  }

  async componentDidMount() {
    this.isInitializing = false;
    await this.list();
  }

  render() {
    const { dataSourceList = [] } = this.state;
    const { children, isProcessing } = this.props;
    return (
      children({
        isProcessing,
        dataSourceList,
        list: this.list,
        isInitializing: this.isInitializing,
      })
    );
  }
}
