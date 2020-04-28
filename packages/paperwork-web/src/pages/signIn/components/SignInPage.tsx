import React from 'react';
import { Card, Icons, Input, Button, Spinner } from '@paperwork/ui-widgets';

import './SignInPage.scss';

interface Props {
  onSignIn: (username: string, password: string) => void;
}

class SignInPage extends React.Component<Props> {

  state = {
    username: '',
    password: '',
    isProcessing: false,
  };

  updateCredential = (key: string, value: string) => {
    this.setState({
      [key]: value,
    });
  }

  private onSignIn = () => {
    const { onSignIn } = this.props;
    const { username, password } = this.state;
    this.setState({
      isProcessing: true,
    });
    onSignIn(username, password);
  }

  render() {
    const { username, password, isProcessing } = this.state;
    return (
      <div className="pwapp-logon-page">
        <Card
          className="pwapp-logon-page__form"
          header={
            <div className="pwapp-logon-page__header">
              <Icons.Logo className="pwapp-logon-page__logo"/>
              <h3>PAPERWORK</h3>
            </div>
          }
          footer={
            <div className="pwapp-logon-page__footer">
              <Button size="xl" color="secondary" onClick={this.onSignIn} disabled={isProcessing}>
                SIGN IN
              </Button>
              <Button type="link" color="primary" disabled={isProcessing}>
                SIGN UP
              </Button>
            </div>
          }
        >
          <Input
            value={username}
            placeholder="USERNAME"
            onChange={
              (e: any) => this.updateCredential('username', e.target.value)
            }
          />
          <Input
            value={password}
            placeholder="PASSWORD"
            onChange={
              (e: any) => this.updateCredential('password', e.target.value)
            }
          />
          {
            isProcessing && <Spinner type="ellipsis" size="s" />
          }
        </Card>
      </div>
    );
  }

}

export default SignInPage;
