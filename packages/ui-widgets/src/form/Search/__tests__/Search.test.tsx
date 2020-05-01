import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';

import Search from '../Search';

describe('Search', () => {
  it('should render properly', () => {
    const wrapper: ShallowWrapper = shallow(<Search placeholder="abc" value="value" className="extra-class" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
