import React, { ReactElement } from 'react';
import { Integration } from '../../integration';
import { ReportDetail } from '../../schema/Report';
import { LOAD_REPORT_DETAIL, CREATE_REPORT, UPDATE_REPORT, DELETE_REPORT } from './intents';
import { getSaveRequestPayload } from './selectors';

export interface DetailProviderState {
  report?: ReportDetail;
  load: () => Promise<ReportDetail>;
  update: (report: ReportDetail) => Promise<void>;
  create: (report: ReportDetail) => Promise<void>;
  remove: () => Promise<void>;
  isInitializing: boolean;
  isProcessing: boolean;
}

interface Props {
  userId: string;
  reportId: string;
  children: (integrationState: DetailProviderState) => ReactElement | null;
  integration: Integration;
  isProcessing: boolean;
  preLoad?: boolean;
}

export default class extends React.Component<Props> {
  private isInitializing = true;

  state = {
    report: undefined,
  };

  private load = async () => {
    const { reportId, userId } = this.props;
    const { integration } = this.props;
    const report = await integration.send({
      intent: LOAD_REPORT_DETAIL,
      method: 'GET',
      urlParams: {
        userId,
        reportId,
      },
    });
    this.setState({
      report,
    });
    return report;
  }

  private update = async (report: ReportDetail) => {
    const { reportId, userId, integration } = this.props;
    await integration.send({
      intent: UPDATE_REPORT,
      method: 'PUT',
      urlParams: {
        userId,
        reportId,
      },
      content: getSaveRequestPayload(report),
    });
    this.setState({
      report,
    });
  }

  private create = async (report: ReportDetail) => {
    const { userId } = this.props;
    const { integration } = this.props;
    await integration.send({
      intent: CREATE_REPORT,
      method: 'POST',
      urlParams: {
        userId,
      },
      content: getSaveRequestPayload(report),
    });
    this.setState({
      report,
    });
  }

  private remove = async () => {
    const { reportId, userId } = this.props;
    const { integration } = this.props;
    await integration.send({
      intent: DELETE_REPORT,
      method: 'DELETE',
      urlParams: {
        userId,
        reportId,
      },
    });
  }

  async componentDidMount() {
    this.isInitializing = false;
    const { reportId, preLoad } = this.props;
    if (reportId !== 'new' && preLoad) {
      await this.load();
    }
  }

  async componentDidUpdate(prevProps: Props) {
    const { reportId, userId, preLoad } = this.props;
    const shouldLoad =
      (reportId !== prevProps.reportId || userId !== prevProps.userId)
      && reportId !== 'new';

    if (preLoad && shouldLoad) {
      await this.load();
    }
  }

  render() {
    const { report } = this.state;
    const { children, isProcessing } = this.props;
    return (
      children({
        report,
        isProcessing,
        load: this.load,
        update: this.update,
        create: this.create,
        remove: this.remove,
        isInitializing: this.isInitializing,
      })
    );
  }
}
