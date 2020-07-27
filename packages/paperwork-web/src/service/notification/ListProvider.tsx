import React, { ReactElement } from 'react';
import { LOAD_NOTIFICATION_LIST, CHECK_NOTIFICATION_UPDATE } from './intents';
import { NotificationList, NotificationUpdate } from '../../schema/Notification';
import { Integration } from '../../integration';

export interface ListProviderState {
  notificationList: NotificationList;
  list: (options?: ListOptions, page?: number) => Promise<NotificationList>;
  checkUpdate: () => Promise<NotificationUpdate>;
  isInitializing: boolean;
  isProcessing: boolean;
}

interface Props {
  children: (integrationState: ListProviderState) => ReactElement | null;
  integration: Integration;
  userId: string;
  isProcessing: boolean;
  preLoad?: boolean;
}

export interface ListOptions {
  keyword?: string;
}

export default class extends React.Component<Props> {
  state = {
    notificationList: {
      entries: [],
      pagination: { page: 0, total: 0 },
    },
  };

  private isInitializing = true;

  private list = async (options: ListOptions = {}, page = 0) => {
    const { keyword } = options;
    const { integration, userId } = this.props;
    const notificationList = await integration.send({
      intent: LOAD_NOTIFICATION_LIST,
      method: 'GET',
      urlParams: {
        userId,
      },
      params: {
        keyword,
        page,
        size: 20,
      },
    });
    this.setState({
      notificationList,
    });
    return notificationList;
  }

  private checkUpdate = async () => {
    const { integration, userId } = this.props;
    const update = await integration.send({
      intent: CHECK_NOTIFICATION_UPDATE,
      method: 'GET',
      urlParams: {
        userId,
      },
    });
    return update;
  }

  async componentDidMount() {
    const { preLoad } = this.props;
    if (preLoad) {
      await this.list();
    }
    this.isInitializing = false;
  }

  render() {
    const { notificationList } = this.state;
    const { children, isProcessing } = this.props;
    return (
      children({
        isProcessing,
        notificationList,
        list: this.list,
        checkUpdate: this.checkUpdate,
        isInitializing: this.isInitializing,
      })
    );
  }
}
