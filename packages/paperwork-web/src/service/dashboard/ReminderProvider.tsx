import React, { ReactElement } from 'react';
import { LOAD_REMINDER } from './intents';
import { Reminder } from '../../schema/Dashboard';
import { Integration } from '../../integration';
import { User } from '../../schema/User';

export interface ReminderProviderState {
  reminder?: Reminder;
  load: () => Promise<Reminder>;
  isInitializing: boolean;
  isProcessing: boolean;
}

interface Props {
  children: (integrationState: ReminderProviderState) => ReactElement | null;
  integration: Integration;
  user: User;
  isProcessing: boolean;
  preLoad?: boolean;
}

export default class extends React.Component<Props> {
  private isInitializing = true;

  state = {
    reminder: undefined,
  };

  private load = async () => {
    const { integration, user } = this.props;
    const reminder = await integration.send({
      intent: LOAD_REMINDER,
      method: 'GET',
      urlParams: {
        userId: user.id,
      },
      params: {},
    });
    this.setState({
      reminder,
    });
    return reminder;
  }

  async componentDidMount() {
    const { preLoad } = this.props;
    if (preLoad) {
      await this.load();
    }
    this.isInitializing = false;
  }

  render() {
    const { reminder } = this.state;
    const { children, isProcessing } = this.props;
    return (
      children({
        isProcessing,
        reminder,
        load: this.load,
        isInitializing: this.isInitializing,
      })
    );
  }
}
