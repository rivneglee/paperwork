import React, { ReactElement } from 'react';
import { Editor, EditorState, ContentState, convertToRaw, convertFromHTML } from 'draft-js';
import classNames from 'classnames';

import Toolbar from './Toolbar';
import decorator from './defaultDecorator';
// @ts-ignore
import draftToHtml from 'draftjs-to-html';
import { FieldGroup } from '../FieldGroup';

export interface Props {
  onChange?: (contentHtml: string) => void;
  contentHtml?: string;
  alignment?: 'left' | 'right' | 'center';
  labelPlacement?: 'left' | 'top';
  className?: string;
  disabled: boolean;
  label?: ReactElement | string;
  isRequired?: boolean;
  labelAccessory?: ReactElement;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
}

interface State {
  editorState: EditorState;
  hasFocus: boolean;
}

class BangEditor extends React.Component<Props, State> {
  editorEl: HTMLElement | null;
  draftEl: Editor | null;
  blurTimeoutID: any;
  static defaultProps = {
    className: '',
    alignment: 'left',
    disabled: false,
  };

  constructor(props: Props) {
    super(props);
    const { contentHtml = '' } = props;
    const blocksFromHTML = convertFromHTML(contentHtml);
    const contentState = blocksFromHTML.contentBlocks ? ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    ) : ContentState.createFromText('');
    this.state = {
      editorState: EditorState.createWithContent(contentState, decorator),
      hasFocus: false,
    };
  }

  private onChange = (editorState: EditorState) => {
    this.setState({ editorState });
  }

  private onBlur = () => {
    const { editorState } = this.state;
    const { onChange } = this.props;
    if (onChange) {
      const rawContentState = convertToRaw(editorState.getCurrentContent());
      onChange(draftToHtml(rawContentState));
    }
  }

  private handleFocus = () => {
    clearTimeout(this.blurTimeoutID);
    if (!this.state.hasFocus) {
      this.setState({
        hasFocus: true,
      });
    }
  }

  private handleBlur = () => {
    this.blurTimeoutID = setTimeout(() => {
      if (this.state.hasFocus) {
        this.setState({
          hasFocus: false,
        });
      }
    },                              200);
  }

  render() {
    const { editorState, hasFocus } = this.state;
    const { className, alignment, label, isRequired, labelAccessory, size, labelPlacement = 'left' } = this.props;
    return (
      <FieldGroup
        label={label}
        isRequired={isRequired}
        labelAccessory={labelAccessory}
        size={size}
        labelPlacement={labelPlacement}
      >
        <div className={classNames(
          'pw-text-editor',
          hasFocus && 'pw-text-editor--active',
          `pw-text-editor--align-${alignment}`,
          className,
        )}
             ref={(el) => { this.editorEl = el; }}
             onBlur={this.handleBlur}
             onFocus={this.handleFocus}>
          <Editor
            ref={(el) => {
              this.draftEl = el;
            }}
            editorState={editorState}
            onChange={this.onChange}
            onBlur={this.onBlur}
            readOnly={this.props.disabled}></Editor>
          <Toolbar
            editor={this.editorEl}
            draft={this.draftEl}
            editorState={this.state.editorState}
            editorHasFocus={this.state.hasFocus}
            readOnly={this.props.disabled}
            onChange={this.onChange}
          />
        </div>
      </FieldGroup>
    );
  }
}

export default BangEditor;
