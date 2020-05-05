import React, { ReactElement } from 'react';
import { LOAD_DATASOURCE_LIST } from './intents';
import { DataSourceList } from '../../schema/DataSource';
import { Integration } from '../../integration';

export interface ListProviderState {
  dataSourceList: DataSourceList;
  list: (options?: ListOptions) => Promise<DataSourceList>;
}

interface Props {
  children: (integrationState: ListProviderState) => ReactElement | null;
  onLoadList?: (dataSourceList: DataSourceList) => void;
  integration: Integration;
  userId: string;
}

export interface ListOptions {
  keyword?: string;
}

export default class extends React.Component<Props> {
  state = {
    dataSourceList: [],
  };

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
    return this.list();
  }

  render() {
    const { dataSourceList = [] } = this.state;
    const { children } = this.props;
    return (
      children({
        dataSourceList,
        list: this.list,
      })
    );
  }
}
