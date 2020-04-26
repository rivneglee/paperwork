import React, { ReactElement } from 'react';

import * as mappings from './mappings';
import { LOAD_DATASOURCE_LIST } from './intents';
import { DataSourceList } from '../../schema/DataSource';
import { Integration, withIntegration } from '../../integration';

export interface IntegrationState {
  dataSourceList: DataSourceList;
  list?: () => Promise<void>;
}

interface Props {
  children: (integrationState: IntegrationState) => ReactElement;
  onLoadList?: (dataSourceList: DataSourceList) => void;
  integration: Integration;
}

class Provider extends React.PureComponent<Props> {
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

export default withIntegration(Provider, mappings);
