import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Tooltip from '../Tooltip';

describe('Tooltip', () => {
  const Trigger = () => <>Trigger</>;

  it('should render for default props', () => {
    const wrapper = shallow(<Tooltip content="This is tooltip"><Trigger /></Tooltip>);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
