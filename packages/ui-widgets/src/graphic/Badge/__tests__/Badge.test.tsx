import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';

import Badge from '../Badge';

describe('Badge', () => {
  it('should render default spinner', () => {
    const wrapper: ShallowWrapper = shallow(
      <Badge>default</Badge>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render with colours', () => {
    const wrapper: ShallowWrapper = shallow(
      <Badge color="primary">default</Badge>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render with left and right element', () => {
    const wrapper: ShallowWrapper = shallow(
      <Badge left={<>left</>} right={<>right</>}>default</Badge>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
