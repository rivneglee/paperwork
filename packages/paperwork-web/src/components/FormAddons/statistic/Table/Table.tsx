import React, { FunctionComponent, useState } from 'react';

import {
  Button,
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
  onOpen: (formId: string, commitId: string) => void;
  onApplyFilter: (filters: FilterCondition[]) => void;
  onExport: (filters: FilterCondition[]) => void;
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
 onExport,
 onPageChange,
 onOpen,
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
  const { fields = [] } = dataSource as any;
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
                <Button
                  onClick={() => onExport(filters)}
                  type="link"
                  color="primary"
                  icon={<Icons.CSV/>}
                >
                  Export
                </Button>
              </div>
              <Scrollable className="pwapp-report-data-table__content">
                <Table>
                  <Table.Header>
                    {
                      fields.map((field: any) => (
                        <Table.HeaderItem className="pwapp-report-data-table__data-col">{field.name}</Table.HeaderItem>
                      ))
                    }
                  </Table.Header>
                  {
                    isEmpty ? (
                      <PageState
                        image={noResultsFound}
                        title="No results found"
                        description=""
                      />
                    ) : (
                        <Table.Body>
                          {
                            entries.map(entry => (
                              <Table.Row onClick={() => onOpen(entry.sourceFormId, entry.id)}>
                                {
                                  fields.map((field: any) => {
                                    const value = entry.values[field.id] || '';
                                    return (
                                      <Table.RowItem className="pwapp-report-data-table__data-col" columnName={field.name}>
                                        {value.toString()}
                                      </Table.RowItem>
                                    );
                                  })
                                }
                              </Table.Row>
                            ))
                          }
                        </Table.Body>
                    )
                  }
                </Table>
              </Scrollable>
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
