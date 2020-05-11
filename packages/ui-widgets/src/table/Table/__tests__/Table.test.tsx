import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';

import Table from '../Table';

describe('Table', () => {
  let wrapper: ShallowWrapper;
  beforeAll(() => {
    wrapper = shallow(
      <Table>
        <Table.Header>
          <Table.RowItem>Column A</Table.RowItem>
          <Table.RowItem>Column B</Table.RowItem>
        </Table.Header>
        <Table.Row>
          <Table.RowItem columnName="Column A">A</Table.RowItem>
          <Table.RowItem columnName="Column B">B</Table.RowItem>
        </Table.Row>
      </Table>,
    );
  });

  it('should render properly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
