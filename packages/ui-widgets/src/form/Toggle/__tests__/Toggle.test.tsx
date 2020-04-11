import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';

import Toggle from '../Toggle';

describe('Toggle', () => {
  it('should render toggle when checked', () => {
    const wrapper: ShallowWrapper = shallow(<Toggle checked={true} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render toggle when unchecked', () => {
    const wrapper: ShallowWrapper = shallow(<Toggle checked={false} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render toggle when disabled', () => {
    const wrapper: ShallowWrapper = shallow(<Toggle checked={true} disabled />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
