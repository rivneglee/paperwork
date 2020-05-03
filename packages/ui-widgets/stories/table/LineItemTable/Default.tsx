import React, { useState } from 'react';

import { LineItemTable, Input, Card } from '../../../src';

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

export default () => {
  const [rowData, setRowData] = useState(data);

  const onUpdateRow = (index: number, name: string, value: string) => {
    const updatedRow = { ...rowData[index], [name]: value };
    const updatedRowData = [...rowData];
    updatedRowData[index] = updatedRow;
    setRowData(updatedRowData);
  };

  const onAddRow = (newLine: any, name: string, value: any) => {
    const newRow = { ...newLine, [name]: value };
    setRowData([...rowData, newRow]);
  };

  const onRemoveRow = (index: number) => {
    const newRowData = rowData.filter((row, i) => i !== index);
    setRowData(newRowData);
  };

  return (
    <div style={{ background: '#ebeef1', padding: '2.4rem' }}>
      <Card>
        <LineItemTable
          columnsConfig={columnsConfig}
          data={rowData}
          onUpdateRow={onUpdateRow}
          onAddRow={onAddRow}
          onRemoveRow={onRemoveRow}
          renderRow={(index, data, onChange) => (
            <LineItemTable.Row columnsConfig={columnsConfig}>
              <LineItemTable.Item>
                <Input value={data.name} onChange={(e: any) => onChange('name', e.target.value)}/>
              </LineItemTable.Item>
              <LineItemTable.Item>
                <Input value={data.team} onChange={(e: any) => onChange('team', e.target.value)}/>
              </LineItemTable.Item>
              <LineItemTable.Item>
                <Input value={data.date} onChange={(e: any) => onChange('date', e.target.value)}/>
              </LineItemTable.Item>
            </LineItemTable.Row>
          )}
        />
      </Card>
    </div>
  );
};
