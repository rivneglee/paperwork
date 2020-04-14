import * as React from 'react';
import { ContentState } from 'draft-js';

interface Props {
  contentState: ContentState;
  entityKey: string;
}

export default class Link extends React.Component<Props> {
  render() {
    const contentState = this.props.contentState;
    const { url } = contentState.getEntity(this.props.entityKey).getData();
    return (
      <a className="pw-text-editor__link" href={url} title={url}>
        {this.props.children}
      </a>
    );
  }
}
