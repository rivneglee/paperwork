import React, { ReactElement } from 'react';
import { LOAD_TREND } from './intents';
import { Trend } from '../../schema/Dashboard';
import { Integration } from '../../integration';
import { User } from '../../schema/User';

export interface TrendProviderState {
  trend?: Trend;
  load: () => Promise<Trend>;
  isInitializing: boolean;
  isProcessing: boolean;
}

interface Props {
  children: (integrationState: TrendProviderState) => ReactElement | null;
  integration: Integration;
  user: User;
  isProcessing: boolean;
  preLoad?: boolean;
}

export default class extends React.Component<Props> {
  private isInitializing = true;

  state = {
    trend: undefined,
  };

  private load = async () => {
    const { integration, user } = this.props;
    const trend = await integration.send({
      intent: LOAD_TREND,
      method: 'GET',
      urlParams: {
        userId: user.id,
      },
      params: {},
    });
    this.setState({
      trend,
    });
    return trend;
  }

  async componentDidMount() {
    const { preLoad } = this.props;
    if (preLoad) {
      await this.load();
    }
    this.isInitializing = false;
  }

  render() {
    const { trend } = this.state;
    const { children, isProcessing } = this.props;
    return (
      children({
        isProcessing,
        trend,
        load: this.load,
        isInitializing: this.isInitializing,
      })
    );
  }
}
