import React, { FunctionComponent, ReactElement } from 'react';

import { DragAndDropType, ToolkitItem, Icons, Avater } from '@paperwork/ui-widgets';
import './Toolbox.scss';
import { FormItemProps } from '../../components/FormDesigner/ActionBar';
import { LayoutItemTypes } from '../../components/FormAddons';

interface Props {
  fieldItems?: FormItemProps[];
  buttonItems?: FormItemProps[];
  statisticItems?: FormItemProps[];
}

interface ItemProps {
  icon: ReactElement;
  text?: string;
}

const Item: FunctionComponent<ItemProps> = ({ icon, text }) => (
  <div className="pwapp-lite-toolbox-item">
    <div className="pwapp-lite-toolbox-item__icon">
      <Avater>
        {icon}
      </Avater>
    </div>
    <div className="pwapp-lite-toolbox-item__text">
      {text}
    </div>
  </div>
);

const Toolbox: FunctionComponent<Props> = ({ fieldItems, statisticItems, buttonItems }) => (
  <div className="pwapp-lite-toolbox">
    <div className="pwapp-lite-toolbox__group">
     Layouts
    </div>
    <div>
      <ToolkitItem id={LayoutItemTypes.VERTICAL_LIST} type={DragAndDropType.LAYOUT}>
        <Item icon={<Icons.List/>}/>
      </ToolkitItem>
      <ToolkitItem id={LayoutItemTypes.HORIZONTAL_LIST} type={DragAndDropType.LAYOUT}>
        <Item icon={<Icons.Columns/>}/>
      </ToolkitItem>
    </div>
    {
      fieldItems && (
        <>
          <div className="pwapp-lite-toolbox__group">
            Inputs
          </div>
          <div>
            {
              fieldItems.map(item => (
                <ToolkitItem key={item.itemType} id={item.itemType} type={DragAndDropType.ITEM}>
                  <Item icon={item.icon} text={item.label}/>
                </ToolkitItem>
              ))
            }
          </div>
        </>
      )
    }
    {
      buttonItems && (
        <>
          <div className="pwapp-lite-toolbox__group">
            Buttons
          </div>
          <div>
            {
              buttonItems.map(item => (
                <ToolkitItem key={item.itemType} id={item.itemType} type={DragAndDropType.ITEM}>
                  <Item icon={item.icon} text={item.label}/>
                </ToolkitItem>
              ))
            }
          </div>
        </>
      )
    }
    {
      statisticItems && (
        <>
          <div className="pwapp-lite-toolbox__group">
            Statistic
          </div>
          <div>
            {
              statisticItems.map(item => (
                <ToolkitItem key={item.itemType} id={item.itemType} type={DragAndDropType.ITEM}>
                  <Item icon={item.icon} text={item.label}/>
                </ToolkitItem>
              ))
            }
          </div>
        </>
      )
    }
  </div>
);

export default Toolbox;
