import React, { ReactElement } from 'react';
import { LOAD_DATASOURCE_LIST } from './intents';
import { DataSourceList } from '../../schema/DataSource';
import { Integration } from '../../integration';

export interface ListProviderState {
  dataSourceList: DataSourceList;
  list?: () => Promise<void>;
}

interface Props {
  children: (integrationState: ListProviderState) => ReactElement;
  onLoadList?: (dataSourceList: DataSourceList) => void;
  integration: Integration;
}

export default class extends React.Component<Props> {
  state = {
    dataSourceList: [],
  };

  private list = async () => {
    const { onLoadList, integration } = this.props;
    const dataSourceList = await integration.read({
      intent: LOAD_DATASOURCE_LIST,
      method: 'GET',
    });
    this.setState({
      dataSourceList,
    });
    onLoadList && onLoadList(dataSourceList);
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
