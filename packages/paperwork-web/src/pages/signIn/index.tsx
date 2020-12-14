import React from 'react';

import SignInPage from './components/SignInPage';
import { AuthenticationProvider, AuthenticationProviderState } from '../../service/authentication';
import { Authentication } from '../../schema/User';

export default () => (
  <AuthenticationProvider>
    {
      ({ authenticate, errorMessage, isProcessing }: AuthenticationProviderState) => {
        const onSignIn = (username: string, password: string) => (
          authenticate(username, password)
            .then((authentication: Authentication) => authentication && window.location.reload())
        );
        return <SignInPage onSignIn={onSignIn} errorMessage={errorMessage} isProcessing={isProcessing}/>;
      }
    }
  </AuthenticationProvider>
);
