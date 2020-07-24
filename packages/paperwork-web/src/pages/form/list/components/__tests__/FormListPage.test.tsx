import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';

import FormListPage from '../FormListPage';

describe('FormListPage', () => {
  const filterOptions = {};
  const onApplyFilter = jest.fn();
  const onFilterChange = jest.fn();
  const onLoadNextPage = jest.fn();
  const onCreateNew = jest.fn();
  const onEdit = jest.fn();
  it('should render when result is empty', () => {
    const wrapper: ShallowWrapper = shallow(
      <FormListPage
        onCreateNew={onCreateNew}
        onEdit={onEdit}
        onLoadNextPage={onLoadNextPage}
        onApplyFilter={onApplyFilter}
        onFilterChange={onFilterChange}
        entries={[]} filterOptions={filterOptions}
        page={0}
        total={10}
        isProcessing={false}
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render when result is not empty', () => {
    const wrapper: ShallowWrapper = shallow(
      <FormListPage
        onLoadNextPage={onLoadNextPage}
        onApplyFilter={onApplyFilter}
        onFilterChange={onFilterChange}
        onCreateNew={onCreateNew}
        onEdit={onEdit}
        page={0}
        total={10}
        isProcessing={false}
        entries={[
          {
            closeDate: '30/07/2020',
            id: '1',
            isPublic: true,
            maxCommits: 250,
            name: 'Employee engagement survey',
            receivedCommits: 10,
            status: 'OPEN',
            statusBadgeColor: 'secondary',
            targetCommits: 100,
            createdAt: '30/06/2020',
            theme: 'purple',
            maxGap: 0,
            targetGap: 0,
            newCommitUrl: '/foo',
          },
        ]} filterOptions={filterOptions}
      />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
