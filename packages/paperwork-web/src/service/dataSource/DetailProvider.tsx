import React, { ReactElement } from 'react';
import { DataSource } from '../../schema/DataSource';
import { Integration } from '../../integration';
import { LOAD_DATASOURCE_DETAIL } from './intents';

export interface DetailProviderState {
  dataSource?: DataSource;
}

interface Props {
  userId: string;
  dataSourceId: string;
  children: (integrationState: DetailProviderState) => ReactElement | null;
  integration: Integration;
}

export default class extends React.Component<Props> {
  state = {
    dataSource: undefined,
  };

  private load = async (userId: string, dataSourceId: string) => {
    const { integration } = this.props;
    const dataSource = await integration.read({
      intent: LOAD_DATASOURCE_DETAIL,
      method: 'GET',
      urlParams: {
        userId,
        dataSourceId,
      },
    });
    this.setState({
      dataSource,
    });
    return dataSource;
  }

  async componentDidMount() {
    const { dataSourceId, userId } = this.props;
    return this.load(userId, dataSourceId);
  }

  render() {
    const { dataSource } = this.state;
    const { children } = this.props;
    return (
      children({
        dataSource,
      })
    );
  }
}
