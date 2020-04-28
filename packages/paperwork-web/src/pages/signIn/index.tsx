import React from 'react';

import SignInPage from './components/SignInPage';
import { AuthenticationProvider, AuthenticationProviderState } from '../../service/authentication';

export default () => (
  <AuthenticationProvider>
    {
      ({ authenticate }: AuthenticationProviderState) => {
        const onSignIn = (username: string, password: string) => (
          authenticate(username, password)
            .then(() => window.location.reload())
        );
        return <SignInPage onSignIn={onSignIn} />;
      }
    }
  </AuthenticationProvider>
);
