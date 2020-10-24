import React, { ReactElement } from 'react';
import { AUTHENTICATE } from './intents';
import { Integration } from '../../integration';
import { Authentication } from '../../schema/User';
import defaultStorage, { AuthenticationStorage } from './AuthenticationStorage';
import IntegrationHttpError from '../../integration/IntegrationHttpError';

export interface AuthenticationProviderState {
  authenticate: (username: string, password: string) => Promise<Authentication>;
  isProcessing: boolean;
  errorMessage?: string;
}

interface Props {
  children: (state: AuthenticationProviderState) => ReactElement;
  integration: Integration;
  isProcessing: boolean;
  storage?: AuthenticationStorage;
}

interface State {
  errorMessage?: string;
}

export default class extends React.Component<Props, State> {
  state  = {
    errorMessage: undefined,
  };

  private authenticate = async (username: string, password: string) => {
    const { integration, storage = defaultStorage } = this.props;
    const response = await integration.send({
      intent: AUTHENTICATE,
      params: {
        username,
        password,
      },
      method: 'GET',
    }, { onError: this.onError });
    if (response) {
      storage.set(response);
    }
    return response;
  }

  private onError = (error: IntegrationHttpError) => {
    if (error.status() === 404) {
      this.setState({ errorMessage: 'Invalid credential' });
    } else {
      this.setState({ errorMessage: 'Cannot login please try again' });
    }
  }

  render() {
    const { children, isProcessing, storage = defaultStorage } = this.props;
    const { errorMessage } = this.state;
    const authentication = storage.get();
    if (authentication) {
      window.location.href = '/';
      return null;
    }
    return (
      children({
        isProcessing,
        errorMessage,
        authenticate: this.authenticate,
      })
    );
  }
}
