import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import DataSourceDetailPage from '../DataSourceDetailPage';

describe('DataSourceDetailPage', () => {
  const dataSource = {
    id: '1',
    name: 'Engagement survey 2020',
    owner: {
      id: '1',
      displayName: 'Alex Li',
      username: 'alexli',
    },
    fields: [
      {
        id: '123',
        name: 'STAFF_NAME',
        grants: [],
      },
    ],
  };

  const commonProps = {
    isPageEdited: true,
    onUpdateDetail: jest.fn(),
    onUpdateField: jest.fn(),
    onAddField: jest.fn(),
    onRemoveField: jest.fn(),
    onSave: jest.fn(),
    onDelete: jest.fn(),
    onCancel: jest.fn(),
    onEditGrant: jest.fn(),
    onAddGrant: jest.fn(),
    onUpdateGrant: jest.fn(),
    onRemoveGrant: jest.fn(),
  };

  it('should render properly if logged in as owner', () => {
    const wrapper = shallow(
      <DataSourceDetailPage dataSource={dataSource} {...commonProps} isOwner={true} />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render properly if not datasource owner', () => {
    const wrapper = shallow(
      <DataSourceDetailPage dataSource={dataSource} {...commonProps} isOwner={false} />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render properly when grantField is given', () => {
    const wrapper = shallow(
      <DataSourceDetailPage
        grantField={{
          id: '123',
          name: 'STAFF_NAME',
          grants: [],
        }}
        dataSource={dataSource}
        {...commonProps}
        isOwner={true}
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
