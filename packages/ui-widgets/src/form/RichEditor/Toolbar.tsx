import * as React from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  getVisibleSelectionRect,
  DraftEntityMutability,
} from 'draft-js';
import { actions } from './toolbarActions';
import ToolbarItem, { ToolbarActionItem } from './ToolbarItem';
import LinkInput from './LinkInput';

function getSelectionCoords(editor: HTMLElement | null, toolbar: HTMLElement | null) {
  if (!toolbar || ! editor) return;
  if (!editor.ownerDocument) return;
  const editorBounds = editor.getBoundingClientRect();
  const win = editor.ownerDocument.defaultView || window;
  const rangeBounds = getVisibleSelectionRect(win);
  if (!rangeBounds || !toolbar) {
    return null;
  }
  const toolbarHeight = toolbar.offsetHeight;
  const toolbarWidth = toolbar.offsetWidth;

  const minOffsetLeft = 5;
  const minOffsetRight = 5;
  const minOffsetTop = 5;

  const rangeWidth = rangeBounds.right - rangeBounds.left;
  const arrowStyle = {};

  let offsetLeft = rangeBounds.left - editorBounds.left + rangeWidth / 2;
  arrowStyle['left'] = '50%';
  if (offsetLeft - toolbarWidth / 2 + editorBounds.left < minOffsetLeft) {
    offsetLeft = toolbarWidth / 2 - editorBounds.left + minOffsetLeft;
    arrowStyle['left'] =
      (rangeBounds.left + rangeBounds.right) / 2 - minOffsetLeft;
  }
  if (
    offsetLeft + toolbarWidth / 2 + editorBounds.left >
    win.innerWidth - minOffsetRight
  ) {
    arrowStyle['left'] =
      rangeBounds.left -
      (win.innerWidth - minOffsetRight - toolbarWidth) +
      (rangeBounds.right - rangeBounds.left) / 2;
    offsetLeft =
      win.innerWidth - editorBounds.left - toolbarWidth / 2 - minOffsetRight;
  }
  let offsetTop = rangeBounds.top - editorBounds.top - 14;
  arrowStyle['top'] = '100%';
  if (offsetTop - minOffsetTop - toolbarHeight + editorBounds.top < 0) {
    // Always make sure that, if the range bounds does not fully exists,
    // we keep the current coordinates
    if (rangeBounds.bottom && !Number.isNaN(rangeBounds.bottom)) {
      offsetTop = rangeBounds.bottom - editorBounds.top + toolbarHeight + 14;
      arrowStyle['top'] = '-14px';
      arrowStyle['transform'] = 'rotate(180deg)';
    }
  }

  return { offsetLeft, offsetTop, arrowStyle };
}

interface Props {
  editorHasFocus: boolean;
  editorState: EditorState;
  editor: HTMLElement | null;
  draft: Editor | null;
  shouldDisplayToolbarFn: (props: Props, state: State) => boolean;
  onChange: (editorState: EditorState) => void;
  actions: ToolbarActionItem[];
  entityInputs?: object;
  readOnly: boolean;
}

interface State {
  editingEntity: string | null;
  show: boolean;
  link: string;
  error: string | null;
  position: {
    left: number
    top: number,
  };
  arrowStyle: any;
}

export default class Toolbar extends React.Component<Props, State> {
  static defaultProps = {
    shouldDisplayToolbarFn(props: Props, state: State) {
      return (
        (props.editorHasFocus || state.editingEntity) &&
        !props.editorState.getSelection().isCollapsed()
      );
    },
    actions,
    entityInputs: {
      LINK: LinkInput,
    },
  };

  toolbarEl: HTMLElement | null;
  arrowEl: HTMLElement | null;
  shouldUpdatePos: boolean;

  constructor(props: Props) {
    super(props);
    this.state = {
      show: false,
      editingEntity: null,
      link: '',
      error: null,
      position: { left: 0, top: 0 },
      arrowStyle: {},
    };
  }

  private toggleInlineStyle = (inlineStyle: string) => {
    const newEditorState = RichUtils.toggleInlineStyle(
      this.props.editorState,
      inlineStyle,
    );
    this.props.onChange(newEditorState);
  }

  private toggleBlockType = (blockType: string) => {
    this.props.onChange(
      RichUtils.toggleBlockType(this.props.editorState, blockType),
    );
  }

  private toggleEntity = (entity: string) => {
    this.setState({ editingEntity: entity });
  }

  private renderButton = (item: ToolbarActionItem, position: number) => {
    let current = null;
    let toggle = () => {};
    let active = false;
    let key = item.label;

    switch (item.type) {
      case 'custom': {
        key = `custom-${position}`;
        toggle = () => item.action(this.props.editorState, this.props.onChange);
        break;
      }
      case 'inline': {
        current = this.props.editorState.getCurrentInlineStyle();
        toggle = () => this.toggleInlineStyle(item.style);
        active = current.has(item.style);
        break;
      }
      case 'block': {
        const selection = this.props.editorState.getSelection();
        current = this.props.editorState
          .getCurrentContent()
          .getBlockForKey(selection.getStartKey())
          .getType();
        toggle = () => this.toggleBlockType(item.style);
        active = item.style === current;
        break;
      }
      case 'separator': {
        key = `sep-${position}`;
        break;
      }
      case 'entity': {
        const { entity = 'LINK' } = item;
        key = `entity-${entity}`;
        toggle = () => this.toggleEntity(entity);
        active = this.hasEntity(entity);
        break;
      }
    }

    return (
      <ToolbarItem key={key} active={active} toggle={toggle} item={item}/>
    );
  }

  private setError = (errorMsg: string) => {
    this.setState({ error: errorMsg });
  }

  private cancelError = () => {
    this.setState({ error: null });
  }

  private setBarPosition = () => {
    const editor = this.props.editor;
    const toolbar = this.toolbarEl;
    const selectionCoords = getSelectionCoords(editor, toolbar);

    if (!selectionCoords) {
      return null;
    }

    if (
      (selectionCoords && !this.state.position) ||
      this.state.position.top !== selectionCoords.offsetTop ||
      this.state.position.left !== selectionCoords.offsetLeft ||
      this.state.arrowStyle !== selectionCoords.arrowStyle ||
      !this.state.show
    ) {
      this.setState({
        show: true,
        position: {
          top: selectionCoords.offsetTop,
          left: selectionCoords.offsetLeft,
        },
        arrowStyle: selectionCoords.arrowStyle,
      });
    }

    return null;
  }

  private handleSetToolbar = () => {
    if (this.props.shouldDisplayToolbarFn(this.props, this.state)) {
      this.shouldUpdatePos = false;
      return this.setBarPosition();
    }
    if (this.state.show) {
      this.setState({
        show: false,
        editingEntity: null,
        link: '',
        error: null,
      });
    }
    return null;

  }

  componentWillReceiveProps(nextProps: Props) {
    const currentContentState = this.props.editorState.getCurrentContent();
    const newContentState = nextProps.editorState.getCurrentContent();

    if (currentContentState === newContentState) {
      this.shouldUpdatePos = true;
      this.setState({
        show: true,
      });
    } else {
      this.setState({
        show: false,
      });
    }
  }

  componentDidUpdate() {
    if (this.shouldUpdatePos) {
      this.handleSetToolbar();
    }
  }

  private getCurrentEntityKey = () => {
    const selection = this.props.editorState.getSelection();
    const anchorKey = selection.getAnchorKey();
    const contentState = this.props.editorState.getCurrentContent();
    const anchorBlock = contentState.getBlockForKey(anchorKey);
    const offset = selection.getAnchorOffset();
    const index = selection.getIsBackward() ? offset - 1 : offset;
    return anchorBlock.getEntityAt(index);
  }

  private getCurrentEntity = () => {
    const contentState = this.props.editorState.getCurrentContent();
    const entityKey = this.getCurrentEntityKey();
    if (entityKey) {
      return contentState.getEntity(entityKey);
    }
    return null;
  }

  private hasEntity = (entityType: string) => {
    const entity = this.getCurrentEntity();
    if (entity && entity.getType() === entityType) {
      return true;
    }
    return false;
  }

  private setEntity = (entityType: string,
                       data: object,
                       mutability: DraftEntityMutability = 'MUTABLE') => {
    const { editorState } = this.props;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      entityType,
      mutability,
      data,
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newState = RichUtils.toggleLink(
      editorState,
      editorState.getSelection(),
      entityKey,
    );
    const selectionState = EditorState.forceSelection(
      newState,
      editorState.getSelection(),
    );

    this.props.onChange(selectionState);
  }

  private removeEntity = () => {
    const { editorState } = this.props;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      // toggleLink should be named toggleEntity: https://github.com/facebook/draft-js/issues/737
      this.props.onChange(RichUtils.toggleLink(editorState, selection, null));
    }
    this.cancelEntity();
  }

  private cancelEntity = () => {
    this.setState(
      {
        editingEntity: null,
        error: null,
      },
      () => {
        this.props.draft && this.props.draft.focus();
      },
    );
  }

  private renderEntityInput = (entityType: string) => {
    if (!this.props.entityInputs) {
      console.warn('no entityInputs provided');
      return null;
    }
    const Component = this.props.entityInputs[entityType];
    const setEntity = (data: object, mutability: DraftEntityMutability) =>
      this.setEntity(entityType, data, mutability);
    let entityData = {};
    let entity = null;
    if (this.hasEntity(entityType)) {
      entity = this.getCurrentEntity();
      if (entity) {
        entityData = entity.getData();
      }
    }
    if (Component) {
      return (
        <Component
          editorState={this.props.editorState}
          setEntity={setEntity}
          entityType={entityType}
          onChange={this.props.onChange}
          cancelEntity={this.cancelEntity}
          removeEntity={this.removeEntity}
          setError={this.setError}
          cancelError={this.cancelError}
          entity={entity}
          {...entityData}
        />
      );
    }
    console.warn(`unknown entity type: ${entityType}`);
    return null;

  }

  renderToolList() {
    return (
      <ul className="pw-toolbar__list">
        {this.props.actions.map(this.renderButton)}
      </ul>
    );
  }

  onMouseDown = (e: any) =>  e.preventDefault();

  render() {
    if (this.props.readOnly) {
      return null;
    }
    const { show, error } = this.state;
    return (
      <div
        className={`pw-toolbar ${show && 'pw-toolbar--open'} ${error && 'pw-toolbar--error'}`}
        style={this.state.position}
        // ref="toolbarWrapper"
        onMouseDown={this.onMouseDown}
      >
        <div style={{ position: 'absolute', bottom: 0 }}>
          <div
            className="pw-toolbar__wrapper"
            ref={(el) => {
              this.toolbarEl = el;
            }}
          >
            {this.state.editingEntity
              ? this.renderEntityInput(this.state.editingEntity)
              : this.renderToolList()}
            <p className="pw-toolbar__error-msg">{this.state.error}</p>
            <span
              className="pw-toolbar__arrow"
              ref={(el) => {
                this.arrowEl = el;
              }}
              style={this.state.arrowStyle}
            />
          </div>
        </div>
      </div>
    );
  }
}
