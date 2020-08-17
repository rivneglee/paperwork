import React, { FunctionComponent } from 'react';

import { IconButton, Item, PageState, Spinner, Table, Icons } from '@paperwork/ui-widgets';
import LabelAccessor from '../../common/LabelAccessor';
import { AggregatedCommits } from '../../../../schema/Statistic';
const noResultFoundImg = require('../../../../assets/setup.svg');

import './Table.scss';

interface Props extends Item {}

const TableView: FunctionComponent<Props> = ({
 id,
 onChange,
 data,
 isProcessing,
 mode,
 label,
 labelPlacement,
 ...item
}) => {
  const { dataSources = {} } = item;
  const [dataSource] = Object.values(dataSources);
  if (!dataSource) return (
    <PageState
      image={noResultFoundImg}
      title="No datasource bind to this widget"
      description="Setup your datasource and data field from settings panel."
    />
  );
  const { fields = [] } = dataSource as any;
  const { entries } = data as AggregatedCommits;
  return (
    <LabelAccessor label={label} labelPlacement={labelPlacement}>
      <div className="pwapp-report-data-table">
        {
          isProcessing ? (<Spinner type="donut" size="s" title="Loading..."/>) : (
            <Table>
              <Table.Header>
                {
                  fields.map((field: any) => (
                    <Table.HeaderItem>{field.displayName}</Table.HeaderItem>
                  ))
                }
                <Table.HeaderItem>Action</Table.HeaderItem>
              </Table.Header>
              <Table.Body>
                {
                  entries.map(entry => (
                    <Table.Row>
                      {
                        fields.map((field: any) => (
                          <Table.RowItem columnName={field.displayName}>
                            {Object.values(entry)[0].values[field.id].toString()}
                          </Table.RowItem>
                        ))
                      }
                      <Table.RowItem columnName="Action">
                        <IconButton><Icons.Form/></IconButton>
                      </Table.RowItem>
                    </Table.Row>
                  ))
                }
              </Table.Body>
            </Table>
          )
        }
      </div>
    </LabelAccessor>
  );
};

export default TableView;
