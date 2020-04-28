import * as React from 'react';
import SignInPage from '../../pages/signIn';
import defaultStorage, { AuthenticationStorage } from './AuthenticationStorage';

export default (
  CompositeComponent: React.ComponentType<any>,
  storage: AuthenticationStorage = defaultStorage,
) => (props: any) => {
  const auth = storage.get();
  if (!auth) {
    return <SignInPage />;
  }
  return <CompositeComponent {...props} />;
};
