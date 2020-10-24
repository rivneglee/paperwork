import React, { ReactElement } from 'react';
import createIntegration from './createIntegration';
import { Integration, Request } from './types';
import IntegrationHttpError from './IntegrationHttpError';
import { PageNotFound } from '../pages/error';

interface Props {
  mappings: any;
  children: (integration: Integration, isProcessing: boolean) => ReactElement | null;
  spinner?: ReactElement;
}

interface State {
  isProcessing: boolean;
  error?: {
    statusCode?: number;
    message?: string;
  };
}

export default class extends React.Component<Props, State> {
  private integration: Integration;

  state = {
    isProcessing: false,
    error: undefined,
  };

  constructor(props: Props) {
    super(props);
    const { mappings } = props;
    this.integration = createIntegration(mappings);
  }

  private send = async (request: Request, options = {}) => {
    const { setLoadingState = true, onError } = options as any;
    try {
      if (setLoadingState) {
        this.setState({
          isProcessing: true,
        });
      }
      const response = await this.integration.send(request, options);
      if (setLoadingState) {
        this.setState({
          isProcessing: false,
        });
      }
      return response;
    } catch (error) {
      if (error instanceof IntegrationHttpError) {
        if (onError) {
          this.setState({
            isProcessing: false,
          });
          onError(error);
        } else {
          this.setState({
            isProcessing: false,
            error: {
              statusCode: error.status(),
            },
          });
        }
        return;
      }
      throw error;
    }
  }

  private getErrorView = (error: any) => {
    if (error && error.statusCode === 404) {
      return <PageNotFound />;
    }
    return null;
  }

  render() {
    const { children, spinner = null } = this.props;
    const { isProcessing, error } = this.state;
    const errorView = this.getErrorView(error);
    const view = (
      <>
        { isProcessing && spinner }
        {
          children({
            send: this.send,
          }, isProcessing)
        }
      </>
    );
    return error ? errorView : view;
  }
}
