import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';

import DataSourceListPage from '../DataSourceListPage';

describe('DataSourceListPage', () => {
  const filterOptions = {};
  const onApplyFilter = jest.fn();
  const onFilterChange = jest.fn();
  const onCreateNew = jest.fn();
  it('should render when result is empty', () => {
    const wrapper: ShallowWrapper = shallow(
      <DataSourceListPage
        onCreateNew={onCreateNew}
        onApplyFilter={onApplyFilter}
        onFilterChange={onFilterChange}
        entries={[]} filterOptions={filterOptions}
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render when result is not empty', () => {
    const wrapper: ShallowWrapper = shallow(
      <DataSourceListPage
        onCreateNew={onCreateNew}
        onApplyFilter={onApplyFilter}
        onFilterChange={onFilterChange}
        entries={[
          {
            id: '1',
            name: 'DS_1',
            owner: '2',
            badges: [{
              color: 'secondary',
              text: 'Collaborative',
            }],
            link: '/1/dataSource/1',
          },
          {
            id: '2',
            name: 'DS_2',
            owner: '1',
            badges: [],
            link: '/1/dataSource/2',
          },
        ]} filterOptions={filterOptions}
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
