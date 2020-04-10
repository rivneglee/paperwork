import React, { Component, ComponentClass } from 'react';
import classNames from 'classnames';

import { Avater } from '../../graphic/Avater';
import Icons from '../../graphic/Icons';
import QuickAddItem, { QuickAddItemComponent } from './QuickAddItem';

interface Props {}

interface State {
  isExpanded: boolean;
}

interface QuickAddComponent extends ComponentClass<Props, State> {
  Item: QuickAddItemComponent;
}

const QuickAdd: QuickAddComponent = class extends Component<Props, State> {
  state = {
    isExpanded: false,
  };

  static Item = QuickAddItem;

  private toggleState = () => {
    const { isExpanded } = this.state;
    this.setState({
      isExpanded: !isExpanded,
    });
  }

  render() {
    const { isExpanded } = this.state;
    const { children } = this.props;
    return (
      <div className="pw-quickadd">
        <div onClick={this.toggleState}>
          <Avater
            size="large"
            shadow
            className={classNames(
              'pw-quickadd__trigger', {
                ['pw-quickadd__trigger--expanded']: isExpanded,
              },
            )}>
            <Icons.Add />
          </Avater>
        </div>
        <div className={classNames(
            'pw-quickadd__items', {
              ['pw-quickadd__items--expanded']: isExpanded,
            },
        )}>
          {children}
        </div>
      </div>
    );
  }
};

export default QuickAdd;
