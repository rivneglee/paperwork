import React, { ReactElement } from 'react';
import { DataSource } from '../../schema/DataSource';
import { Integration } from '../../integration';
import { LOAD_DATASOURCE_DETAIL, UPDATE_DATASOURCE, CREATE_DATASOURCE, DELETE_DATASOURCE } from './intents';

export interface DetailProviderState {
  dataSource?: DataSource;
  load: () => Promise<DataSource>;
  update: (dataSource: DataSource) => Promise<void>;
  create: (dataSource: DataSource) => Promise<void>;
  remove: () => Promise<void>;
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

  private load = async () => {
    const { dataSourceId, userId } = this.props;
    const { integration } = this.props;
    const dataSource = await integration.send({
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

  private update = async (dataSource: DataSource) => {
    const { dataSourceId, userId } = this.props;
    const { integration } = this.props;
    await integration.send({
      intent: UPDATE_DATASOURCE,
      method: 'PUT',
      urlParams: {
        userId,
        dataSourceId,
      },
      content: dataSource,
    });
    this.setState({
      dataSource,
    });
  }

  private create = async (dataSource: DataSource) => {
    const { userId } = this.props;
    const { integration } = this.props;
    await integration.send({
      intent: CREATE_DATASOURCE,
      method: 'POST',
      urlParams: {
        userId,
      },
      content: dataSource,
    });
    this.setState({
      dataSource,
    });
  }

  private remove = async () => {
    const { dataSourceId, userId } = this.props;
    const { integration } = this.props;
    await integration.send({
      intent: DELETE_DATASOURCE,
      method: 'DELETE',
      urlParams: {
        userId,
        dataSourceId,
      },
    });
  }

  async componentDidMount() {
    const { dataSourceId } = this.props;
    if (dataSourceId !== 'new') {
      await this.load();
    }
  }

  render() {
    const { dataSource } = this.state;
    const { children } = this.props;
    return (
      children({
        dataSource,
        load: this.load,
        update: this.update,
        create: this.create,
        remove: this.remove,
      })
    );
  }
}
