import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';

import Spinner from '../Spinner';

describe('Spinner', () => {
  it('should render default spinner', () => {
    const wrapper: ShallowWrapper = shallow(
      <Spinner />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render donut', () => {
    const wrapper: ShallowWrapper = shallow(
      <Spinner type="donut" />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render ellipsis', () => {
    const wrapper: ShallowWrapper = shallow(
      <Spinner type="ellipsis" />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render small size spinner', () => {
    const wrapper: ShallowWrapper = shallow(
      <Spinner size="s" />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should render medium size spinner', () => {
    const wrapper: ShallowWrapper = shallow(
      <Spinner size="m" />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should render large size spinner', () => {
    const wrapper: ShallowWrapper = shallow(
      <Spinner size="l" />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
