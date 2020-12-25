import React, { ReactElement } from 'react';
import { LOAD_NOTIFICATION_LIST, CHECK_NOTIFICATION_UPDATE, SET_READ_STATE } from './intents';
import { NotificationList, NotificationUpdate } from '../../schema/Notification';
import { Integration } from '../../integration';

export interface ListProviderState {
  notificationList: NotificationList;
  list: (options?: ListOptions, page?: number) => Promise<NotificationList>;
  checkUpdate: () => Promise<NotificationUpdate>;
  setReadState: (notificationId: string) => void;
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
    const { keyword = '' } = options;
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
        size: 40,
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

  private setReadState = async (notificationId: string) => {
    const { integration, userId } = this.props;
    await integration.send({
      intent: SET_READ_STATE,
      method: 'PUT',
      urlParams: {
        userId,
        notificationId,
      },
    }, { setLoadingState: false });
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
        setReadState: this.setReadState,
        isInitializing: this.isInitializing,
      })
    );
  }
}
