import React, { ReactElement } from 'react';
import equal from 'deep-equal';
import { QUERY_COMMITS } from './intents';
import { AggregatedCommits } from '../../schema/Statistic';
import { Integration } from '../../integration';

export interface AggregatedCommitsProviderState {
  commits: AggregatedCommits;
  load: (page: number, filters?: FilterCondition[]) => Promise<AggregatedCommits>;
  isInitializing: boolean;
  isProcessing: boolean;
}

export interface FilterCondition {
  filterField: string;
  filterValue?: string;
}

export interface Query {
  [dataSourceId: string]: {
    dataSourceId: string;
    fields: string[];
  };
}

interface Props {
  children: (integrationState: AggregatedCommitsProviderState) => ReactElement | null;
  integration: Integration;
  userId: string;
  isProcessing: boolean;
  preLoad?: boolean;
  query?: Query;
}

export default class extends React.Component<Props> {
  state = {
    commits: {
      entries: [],
      pagination: { page: 0, total: 0 },
    },
  };

  private isInitializing = true;

  private load = async (page = 0, filters = []) => {
    const { integration, userId, query } = this.props;
    if (!query) return;
    const commits = await integration.send({
      intent: QUERY_COMMITS,
      method: 'POST',
      content: {
        query,
        filters,
      },
      urlParams: {
        userId,
      },
      params: {
        page,
        size: 50,
      },
    });
    this.setState({
      commits,
    });
    return commits;
  }

  async componentDidMount() {
    const { preLoad } = this.props;
    if (preLoad) {
      await this.load();
    }
    this.isInitializing = false;
  }

  async componentDidUpdate(prevProps: Props) {
    const { preLoad, query } = this.props;
    if (preLoad && query !== prevProps.query && !equal(query, prevProps.query)) {
      await this.load();
    }
  }

  render() {
    const { commits } = this.state;
    const { children, isProcessing } = this.props;
    return (
      children({
        isProcessing,
        commits,
        load: this.load,
        isInitializing: this.isInitializing,
      })
    );
  }
}
