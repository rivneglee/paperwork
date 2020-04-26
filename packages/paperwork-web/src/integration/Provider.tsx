import React, { ReactElement } from 'react';
import createIntegration from './createIntegration';
import { Integration, ReadRequest, WriteRequest } from './types';
import Spinner from '../components/PageTransitionSpinner/Spinner';

interface Props {
  mappings: any;
  children: (integration: Integration) => ReactElement;
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

  private read = async (request: ReadRequest) => {
    this.setState({
      isProcessing: true,
    });
    const response = await this.integration.read(request);
    this.setState({
      isProcessing: false,
    });
    return response;
  }

  private write = async (request: WriteRequest) => {
    this.setState({
      isProcessing: true,
    });
    const response = await this.integration.write(request);
    this.setState({
      isProcessing: false,
    });
    return response;
  }

  render() {
    const { children, spinner = <Spinner /> } = this.props;
    const { isProcessing } = this.state;
    return (
      <>
        { isProcessing && spinner }
        {
          children({
            read: this.read,
            write: this.write,
          })
        }
      </>
    );
  }
}
