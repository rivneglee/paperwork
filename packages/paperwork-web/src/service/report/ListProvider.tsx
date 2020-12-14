import React, { ReactElement } from 'react';
import { LOAD_REPORT_LIST } from './intents';
import { ReportList } from '../../schema/Report';
import { Integration } from '../../integration';

export interface ListProviderState {
  reportList: ReportList;
  list: (options?: ListOptions, page?: number) => Promise<ReportList>;
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
    reportList: {
      entries: [],
      pagination: { page: 0, total: 0 },
    },
  };

  private isInitializing = true;

  private list = async (options: ListOptions = {}, page = 0) => {
    const { keyword = '' } = options;
    const { integration, userId } = this.props;
    const reportList = await integration.send({
      intent: LOAD_REPORT_LIST,
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
      reportList,
    });
    return reportList;
  }

  async componentDidMount() {
    const { preLoad } = this.props;
    if (preLoad) {
      await this.list();
    }
    this.isInitializing = false;
  }

  render() {
    const { reportList } = this.state;
    const { children, isProcessing } = this.props;
    return (
      children({
        isProcessing,
        reportList,
        list: this.list,
        isInitializing: this.isInitializing,
      })
    );
  }
}
