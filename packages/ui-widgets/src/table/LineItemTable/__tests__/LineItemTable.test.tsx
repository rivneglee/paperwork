import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';

import LineItemTable from '../LineItemTable';
import { Input } from '../../../form/Input';

describe('LineItemTable', () => {
  let wrapper: ShallowWrapper;

  const data = [
    { name: 'CHENG LI', team: 'Customer Service', date: '02/03/2020' },
    { name: 'SUN WEI', team: 'Customer Service', date: '02/03/2020' },
    { name: 'LIPING ZHAO', team: 'Customer Service', date: '02/03/2020' },
  ];

  const columnsConfig = [
    { columnName: 'Name' },
    { columnName: 'Team' },
    { columnName: 'On boarding date', style: { width: 200 } },
  ];

  beforeAll(() => {
    wrapper = shallow(
      <LineItemTable
        columnsConfig={columnsConfig}
        data={data}
        renderRow={(index, data) => (
          <LineItemTable.Row columnsConfig={columnsConfig}>
            <LineItemTable.Item>
              <Input value={data.name}/>
            </LineItemTable.Item>
            <LineItemTable.Item>
              <Input value={data.team}/>
            </LineItemTable.Item>
            <LineItemTable.Item>
              <Input value={data.date}/>
            </LineItemTable.Item>
          </LineItemTable.Row>
        )}
      />,
    );
  });

  it('should render properly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
