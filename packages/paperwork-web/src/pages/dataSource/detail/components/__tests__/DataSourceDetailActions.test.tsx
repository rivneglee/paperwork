import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import DataSourceDetailActions from '../DataSourceDetailActions';

describe('DataSourceDetailActions', () => {
  const commonProps = {
    onClickDelete: jest.fn(),
    onClickCancel: jest.fn(),
    onClickSave: jest.fn(),
  };

  it('should render properly when creating new', () => {
    const wrapper = shallow(
      <DataSourceDetailActions {...commonProps} isOwner={true} isCreating={true} />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render properly when editing collaborative datasource', () => {
    const wrapper = shallow(
      <DataSourceDetailActions {...commonProps} isOwner={false} isCreating={false} />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render properly when editing owned datasource', () => {
    const wrapper = shallow(
      <DataSourceDetailActions {...commonProps} isOwner={true} isCreating={false} />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
