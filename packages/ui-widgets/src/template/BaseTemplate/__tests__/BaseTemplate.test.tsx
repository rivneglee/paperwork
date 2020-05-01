import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import BaseTemplate from '../BaseTemplate';

describe('BaseTemplate', () => {
  const Header = () => <>Header</>;
  const Content = () => <>Content</>;
  const Footer = () => <>Footer</>;

  it('should render properly', () => {
    const wrapper = shallow(
      <BaseTemplate header={<Header/>} footer={<Footer/>}>
        <Content/>
      </BaseTemplate>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
