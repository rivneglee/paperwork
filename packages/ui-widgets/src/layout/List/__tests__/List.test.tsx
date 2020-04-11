import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';

import List from '../List';
import Icons from '../../../graphic/Icons';

describe('List', () => {
  it('should render without icons', () => {
    const wrapper: ShallowWrapper = shallow(
      <List>
        <List.Item>
          Forms
        </List.Item>
        <List.Item>
          Reports
        </List.Item>
      </List>);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render with icons', () => {
    const wrapper: ShallowWrapper = shallow(
      <List>
        <List.Item icon={<Icons.Form />}>
          Forms
        </List.Item>
        <List.Item icon={<Icons.Chart />}>
          Reports
        </List.Item>
      </List>);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
