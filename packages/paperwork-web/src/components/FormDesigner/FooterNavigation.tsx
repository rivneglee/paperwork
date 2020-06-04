import React, { FunctionComponent } from 'react';
import { Avater, Icons } from '@paperwork/ui-widgets';
import Toolkit from './Toolkit';

interface Props {}

const FooterNavigation: FunctionComponent<Props> = () => {
  return (
    <div className="pwapp-designer-footer-navigation">
      <Avater
        size="large"
        shadow
        className="pwapp-designer-footer-navigation__action pwapp-designer-footer-navigation__action--red">
        <Icons.Theme/>
      </Avater>
      <Toolkit/>
      <Avater
        size="large"
        shadow
        className="pwapp-designer-footer-navigation__action pwapp-designer-footer-navigation__action--green">
        <Icons.Save/>
      </Avater>
    </div>
  );
};

export default FooterNavigation;
