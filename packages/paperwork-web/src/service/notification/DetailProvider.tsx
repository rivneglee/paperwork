import React, { ReactElement } from 'react';
import { Integration } from '../../integration';
import { NotificationDetail } from '../../schema/Notification';
import { LOAD_NOTIFICATION_DETAIL } from './intents';

export interface DetailProviderState {
  notification?: NotificationDetail;
  load: () => Promise<NotificationDetail>;
  isInitializing: boolean;
  isProcessing: boolean;
}

interface Props {
  userId: string;
  notificationId: string;
  children: (integrationState: DetailProviderState) => ReactElement | null;
  integration: Integration;
  isProcessing: boolean;
  preLoad?: boolean;
}

export default class extends React.Component<Props> {
  private isInitializing = true;

  state = {
    notification: undefined,
  };

  private load = async () => {
    const { notificationId, userId } = this.props;
    const { integration } = this.props;
    const notification = await integration.send({
      intent: LOAD_NOTIFICATION_DETAIL,
      method: 'GET',
      urlParams: {
        userId,
        notificationId,
      },
    });
    this.setState({
      notification,
    });
    return notification;
  }

  async componentDidMount() {
    this.isInitializing = false;
    const { preLoad } = this.props;
    if (preLoad) {
      await this.load();
    }
  }

  render() {
    const { notification } = this.state;
    const { children, isProcessing } = this.props;
    return (
      children({
        notification,
        isProcessing,
        load: this.load,
        isInitializing: this.isInitializing,
      })
    );
  }
}
