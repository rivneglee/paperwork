import React, { FunctionComponent, useState } from 'react';

import {
  Button,
  IconButton,
  Item,
  PageState,
  Spinner,
  Table,
  Icons,
  Paginator,
  Scrollable,
  Drawer,
} from '@paperwork/ui-widgets';
import LabelAccessor from '../../common/LabelAccessor';
import { AggregatedCommits } from '../../../../schema/Statistic';

const noDataSource = require('../../../../assets/setup.svg');
const noResultsFound = require('../../../../assets/empty-commits.svg');
import './Table.scss';
import { DataSource } from '../../../../schema/DataSource';
import { FilterCondition } from '../../../../service/statistic';
import Filter from '../../common/Filter';

interface Props extends Item {
  dataSources: {[key: string]: DataSource};
  onApplyFilter: (filters: FilterCondition[]) => void;
  onPageChange: (page: number, filters: FilterCondition[]) => void;
}

const TableView: FunctionComponent<Props> = ({
 id,
 onChange,
 data,
 isProcessing,
 mode,
 label,
 labelPlacement,
 dataSources = {},
 onApplyFilter,
 onPageChange,
 ...item
}) => {
  const [dataSource] = Object.values(dataSources);
  const { pagination, entries } = data as AggregatedCommits;
  const isEmpty = entries.length === 0;
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filters, setFilters] = useState<FilterCondition[]>([]);
  const onFilterChange = (filters: FilterCondition[]) => setFilters(filters);
  if (!dataSource) {
    return (
      <PageState
        image={noDataSource}
        title="No datasource bind to this widget"
        description="Setup your datasource and data field from settings panel."
      />
    );
  }
  const { fields = [], id: dataSourceId } = dataSource as any;
  return (
    <LabelAccessor label={label} labelPlacement={labelPlacement}>
      <div className="pwapp-report-data-table">
        {
          isProcessing ? (<Spinner type="donut" size="m" title="Loading..."/>) : (
            <div className="pwapp-report-data-table">
              <div className="pwapp-report-data-table__toolbar">
                <Button
                  onClick={() => setShowFilterPanel(true)}
                  type="link"
                  color="primary"
                  icon={<Icons.Filter/>}
                >
                  Filter
                </Button>
              </div>
              <Table className="pwapp-report-data-table__content">
                <Table.Header>
                  {
                    fields.map((field: any) => (
                      <Table.HeaderItem>{field.name}</Table.HeaderItem>
                    ))
                  }
                  <Table.HeaderItem>Action</Table.HeaderItem>
                </Table.Header>
                {
                  isEmpty ? (
                    <PageState
                      image={noResultsFound}
                      title="No results found"
                      description=""
                    />
                  ) : (
                    <Scrollable>
                      <Table.Body>
                        {
                          entries.map(entry => (
                            <Table.Row>
                              {
                                fields.map((field: any) => (
                                  <Table.RowItem columnName={field.name}>
                                    {entry[dataSourceId].values[field.id].toString()}
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
                    </Scrollable>
                  )
                }
              </Table>
              <Paginator
                onNavigate={page => onPageChange(page, filters)}
                current={pagination.page}
                total={pagination.total}
              />
              <Drawer
                placement="right"
                header={<h3>Filters</h3>}
                isShow={showFilterPanel}
                onClose={() => setShowFilterPanel(false)}
              >
                <Scrollable className="pwapp-report-data-table__filter">
                  <Filter onFilterChange={onFilterChange} filters={filters} fields={fields}/>
                  <div className="pwapp-report-data-table__footer">
                    <Button
                      icon={<Icons.Filter/>}
                      color="primary"
                      type="link"
                      onClick={() => onApplyFilter(filters)}
                    >
                      Apply Filter
                    </Button>
                  </div>
                </Scrollable>
              </Drawer>
            </div>
          )
        }
      </div>
    </LabelAccessor>
  );
};

export default TableView;
