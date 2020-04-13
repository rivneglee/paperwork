import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';

import Scrollable from '../Scrollable';

describe('Scrollble', () => {
  const Content = () => <>'Content'</>;

  it('should render without custom css', () => {
    const wrapper: ShallowWrapper = shallow(
      <Scrollable>
        <Content />
      </Scrollable>);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render with custom css', () => {
    const wrapper: ShallowWrapper = shallow(
      <Scrollable className="custom-css">
        <Content />
      </Scrollable>);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
