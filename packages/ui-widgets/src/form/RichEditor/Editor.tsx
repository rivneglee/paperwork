import React, { ReactElement } from 'react';
import { EditorState, ContentState, convertToRaw, convertFromHTML } from 'draft-js';
// @ts-ignore
import Editor from 'draft-js-plugins-editor';
// @ts-ignore
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import '../../../node_modules/draft-js-mention-plugin/lib/plugin.css';
import classNames from 'classnames';

import Toolbar from './Toolbar';
import decorator from './defaultDecorator';
// @ts-ignore
import draftToHtml from 'draftjs-to-html';
import { FieldGroup } from '../FieldGroup';

export interface Props {
  onChange?: (contentHtml: string, rawContent?: object) => void;
  contentHtml?: string;
  alignment?: 'left' | 'right' | 'center';
  labelPlacement?: 'left' | 'top';
  className?: string;
  disabled: boolean;
  label?: ReactElement | string;
  isRequired?: boolean;
  labelAccessory?: ReactElement;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  placeholder?: string;
  mentions?: any[];
  showToolbar?: boolean;
}

interface State {
  editorState: EditorState;
  hasFocus: boolean;
  suggestions: any[];
}

class BangEditor extends React.Component<Props, State> {
  editorEl: HTMLElement | null;
  draftEl: Editor | null;
  blurTimeoutID: any;
  mentionPlugin: any;

  static defaultProps = {
    className: '',
    alignment: 'left',
    disabled: false,
  };

  constructor(props: Props) {
    super(props);
    const { contentHtml = '<span></span>' } = props;
    const blocksFromHTML = convertFromHTML(contentHtml);
    const contentState = blocksFromHTML.contentBlocks ? ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    ) : ContentState.createFromText('');
    this.state = {
      editorState: EditorState.createWithContent(contentState, decorator),
      hasFocus: false,
      suggestions: [],
    };
    this.mentionPlugin = createMentionPlugin({
      entityMutability: 'IMMUTABLE',
    });
  }

  private onChange = (editorState: EditorState) => {
    this.setState({ editorState });
  }

  private onBlur = () => {
    const { editorState } = this.state;
    const { onChange } = this.props;
    if (onChange) {
      const rawContentState = convertToRaw(editorState.getCurrentContent());
      onChange(draftToHtml(rawContentState), rawContentState);
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

  private onSearchChange = ({ value }: any) => {
    const { mentions = [] } = this.props;
    this.setState({
      suggestions: defaultSuggestionsFilter(value, mentions),
    });
  }

  private onAddMention = () => {};

  render() {
    const { editorState, hasFocus, suggestions } = this.state;
    const {
      className,
      mentions,
      alignment,
      label,
      isRequired,
      labelAccessory,
      size,
      labelPlacement = 'left',
      placeholder,
      showToolbar = true,
    } = this.props;
    const { MentionSuggestions } = this.mentionPlugin;
    const enableMentionPlugin = mentions && mentions.length > 0;
    const plugins = [];
    if (enableMentionPlugin) {
      plugins.push(this.mentionPlugin);
    }
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
            placeholder={placeholder}
            ref={(el: any) => this.draftEl = el}
            editorState={editorState}
            onChange={this.onChange}
            onBlur={this.onBlur}
            plugins={plugins}
            readOnly={this.props.disabled}></Editor>
          {
            enableMentionPlugin && <MentionSuggestions
                onSearchChange={this.onSearchChange}
                suggestions={suggestions}
                onAddMention={this.onAddMention}
            />
          }
          {
            showToolbar && <Toolbar
                editor={this.editorEl}
                draft={this.draftEl}
                editorState={this.state.editorState}
                editorHasFocus={this.state.hasFocus}
                readOnly={this.props.disabled}
                onChange={this.onChange}
            />
          }
        </div>
      </FieldGroup>
    );
  }
}

export default BangEditor;
