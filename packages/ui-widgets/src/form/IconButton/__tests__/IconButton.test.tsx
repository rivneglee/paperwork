import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';

import IconButton from '../IconButton';
import Icons from '../../../graphic/Icons';

describe('IconButton', () => {
  it('should render icon button correct', () => {
    const wrapper: ShallowWrapper = shallow(
      <IconButton>
        <Icons.ArrowLeft />
      </IconButton>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
