/* tslint:disable:max-line-length */
import * as React from 'react';
import Icons from '../../graphic/Icons';

interface Props {
  url?: string;
  cancelEntity: () => void;
  removeEntity: () => void;
  setEntity: (entity: {url: string}) => void;
  setError: (errorMsg: string) => void;
  cancelError: () => void;
  entity: boolean;
}

interface State {
  url: string;
}

class LinkInput extends React.Component<Props, State> {
  textInput: HTMLElement | null;

  constructor(props: Props) {
    super(props);
    this.state = {
      url: (props && props.url) || '',
    };
  }

  private setLink = (event: any) => {
    let { url } = this.state;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `http://${url}`;
    }
    const expression = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}\-\x{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/gi;

    const regex = new RegExp(expression);

    if (!url.match(regex)) {
      const errorMsg = 'Invalid Link';
      this.props.setError(errorMsg);
      if (this.textInput) {
        this.textInput.focus();
      }
      return;
    }
    this.props.setEntity({ url });
    this.reset();
    event.target.blur();
  }

  private reset = () => {
    this.setState({
      url: '',
    });
    this.props.cancelEntity();
  }

  private onLinkChange = (event: any) => {
    event.stopPropagation();
    const url = event.target.value;

    if (url === '') {
      this.props.cancelError();
    }

    this.setState({ url });
  }

  private onLinkKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.setLink(event);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.reset();
    }
  }

  componentDidMount() {
    if (this.textInput) {
      this.textInput.focus();
    }
  }

  render() {
    const msg = 'Type the link and press enter';

    return (
      <div style={{ whiteSpace: 'nowrap' }}>
        <input
          ref={(el) => { this.textInput = el; }}
          type="text"
          className="pw-toolbar__input"
          onChange={this.onLinkChange}
          value={this.state.url}
          onKeyDown={this.onLinkKeyDown}
          placeholder={msg}
        />
        <span className="pw-toolbar__item" style={{ verticalAlign: 'bottom' }}>
          <button
            onClick={this.props.removeEntity}
            type="button"
            className="pw-toolbar__button pw-toolbar__input-button"
          >
            {this.props.entity ? <Icons.Unlink /> : <Icons.Close />}
          </button>
        </span>
      </div>
    );
  }
}

export default LinkInput;
