import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import PageState from '../PageState';

describe('PageState', () => {
  it('should render properly when has image and buttons', () => {
    const wrapper = shallow(
      <PageState title="Title" description="desc" image="http://foo" buttons={[
        <button/>,
        <button/>,
      ]}/>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render properly without button and image', () => {
    const wrapper = shallow(
      <PageState title="Title" description="desc"/>,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
