import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';

import Button from '../Button';

describe('Button', () => {
  it('should render default button', () => {
    const wrapper: ShallowWrapper = shallow(
      <Button>Button</Button>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render outlined button', () => {
    const wrapper: ShallowWrapper = shallow(
      <Button type="outlined">Button</Button>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render text button', () => {
    const wrapper: ShallowWrapper = shallow(
      <Button type="text">Button</Button>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render link button', () => {
    const wrapper: ShallowWrapper = shallow(
      <Button type="text">Button</Button>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render primary color button', () => {
    const wrapper: ShallowWrapper = shallow(
      <Button color="primary">Button</Button>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render secondary color button', () => {
    const wrapper: ShallowWrapper = shallow(
      <Button color="secondary">Button</Button>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render disabled button', () => {
    const wrapper: ShallowWrapper = shallow(
      <Button disabled>Button</Button>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render button with left icon', () => {
    const wrapper: ShallowWrapper = shallow(
      <Button icon={<span>icon</span>}>Button</Button>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render button with right icon', () => {
    const wrapper: ShallowWrapper = shallow(
      <Button iconPlacement="right" icon={<span>icon</span>}>Button</Button>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
