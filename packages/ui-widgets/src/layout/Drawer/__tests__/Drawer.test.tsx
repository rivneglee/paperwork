import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';

import Drawer from '../Drawer';

describe('IconButton', () => {
  const Content = () => <>Content</>;

  it('should render drawer when it opened', () => {
    const wrapper: ShallowWrapper = shallow(
      <Drawer isShow={true}>
        <Content />
      </Drawer>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should not render drawer when it closed', () => {
    const wrapper: ShallowWrapper = shallow(
      <Drawer isShow={false}>
        <Content />
      </Drawer>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render with right style when place to right', () => {
    const wrapper: ShallowWrapper = shallow(
      <Drawer isShow={false} placement="right">
        <Content />
      </Drawer>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
