import React, { ReactElement } from 'react';

import * as mappings from './mappings';
import createIntegration from '../../integration';
import { LOAD_DATASOURCE_LIST } from './intents';
import { DataSourceList } from '../../schema/DataSource';

interface IntegrationState {
  dataSourceList: DataSourceList;
  list?: () => Promise<void>;
}

interface Props {
  children: (integrationState: IntegrationState) => ReactElement;
  onLoadList?: (dataSourceList: DataSourceList) => void;
  spinner: ReactElement;
}

export default class extends React.PureComponent<Props> {
  private integration = createIntegration(mappings);

  state = {
    isLoading: true,
    dataSourceList: [],
  };

  constructor(props: Props) {
    super(props);
  }

  private list = async () => {
    const { onLoadList } = this.props;
    this.setState({
      isLoading: true,
      dataSourceList: [],
    });
    const dataSourceList = await this.integration.read({
      intent: LOAD_DATASOURCE_LIST,
      method: 'GET',
    });
    this.setState({
      dataSourceList,
      isLoading: false,
    });
    onLoadList && onLoadList(dataSourceList);
  }

  async componentDidMount() {
    return this.list();
  }

  render() {
    const { isLoading, dataSourceList = [] } = this.state;
    const { children, spinner } = this.props;
    return (
      isLoading ? spinner : children({
        dataSourceList,
        list: this.list,
      })
    );
  }
}
