import React, { ReactElement } from 'react';
import { AUTHENTICATE } from './intents';
import { Integration } from '../../integration';
import { Authentication } from '../../schema/User';
import defaultStorage, { AuthenticationStorage } from './AuthenticationStorage';

export interface AuthenticationProviderState {
  authenticate: (username: string, password: string) => Promise<Authentication>;
  isProcessing: boolean;
}

interface Props {
  children: (state: AuthenticationProviderState) => ReactElement;
  integration: Integration;
  isProcessing: boolean;
  storage?: AuthenticationStorage;
}

export default class extends React.Component<Props> {
  private authenticate = async (username: string, password: string) => {
    const { integration, storage = defaultStorage } = this.props;
    const response = await integration.read({
      intent: AUTHENTICATE,
      params: {
        username,
        password,
      },
      method: 'GET',
    });
    storage.set(response);
    return response;
  }

  render() {
    const { children, isProcessing, storage = defaultStorage } = this.props;
    const authentication = storage.get();
    if (authentication) {
      window.location.href = '/#/';
      return null;
    }
    return (
      children({
        isProcessing,
        authenticate: this.authenticate,
      })
    );
  }
}
