import React, { ReactElement } from 'react';
import createIntegration from './createIntegration';
import { Integration, Request } from './types';

interface Props {
  mappings: any;
  children: (integration: Integration, isProcessing: boolean) => ReactElement | null;
  spinner?: ReactElement;
}

interface State {
  isProcessing: boolean;
}

export default class extends React.Component<Props, State> {
  private integration: Integration;

  state = {
    isProcessing: false,
  };

  constructor(props: Props) {
    super(props);
    const { mappings } = props;
    this.integration = createIntegration(mappings);
  }

  private send = async (request: Request) => {
    this.setState({
      isProcessing: true,
    });
    const response = await this.integration.send(request);
    this.setState({
      isProcessing: false,
    });
    return response;
  }

  render() {
    const { children, spinner = null } = this.props;
    const { isProcessing } = this.state;
    return (
      <>
        { isProcessing && spinner }
        {
          children({
            send: this.send,
          }, isProcessing)
        }
      </>
    );
  }
}
