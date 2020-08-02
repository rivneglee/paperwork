import React, { FunctionComponent } from 'react';
import { Button, Icons, Card, Input, PageState, PaginationTemplate, Table } from '@paperwork/ui-widgets';
import classNames from 'classnames';

import Spinner from '../../../../components/PageTransitionSpinner/Spinner';
import { NotificationEvent } from '../../../../schema/Notification';

const noResultFoundImg = require('../../../../assets/no-results-found.svg');
import './NotificationListPage.scss';
import FilterBar from '../../../../lite/FilterBar/FilterBar';
import AppBar from '../../../../lite/AppBar/AppBar';

export interface Notification {
  id: string;
  subject: string;
  receivedAt: string;
  sender: string;
  event: NotificationEvent;
  isUnread: boolean;
}

interface Props {
  entries: Notification[];
  page: number;
  total: number;
  isProcessing?: boolean;
  filterOptions: FilterOptions;
  onLoadNextPage: (filterOptions: FilterOptions, page: number) => void;
  onApplyFilter: (filterOptions: FilterOptions) => void;
  onFilterChange: (option: FilterOption) => void;
  onView: (notification: Notification) => void;
}

export interface FilterOption {
  key: string;
  value: number | string;
}

export interface FilterOptions {
  keyword?: string;
}

const NotificationListPage: FunctionComponent<Props> = ({
  entries,
  page,
  total,
  isProcessing,
  onLoadNextPage,
  filterOptions,
  onFilterChange,
  onApplyFilter,
  onView,
}) => {
  const handleFilterChange = (key: string, handler: any) => (e: any) => handler({ key, value: e.target.value });

  const tableView = (
    <Table className="pwapp-notification-list">
      <Table.Header>
        <Table.HeaderItem>Subject</Table.HeaderItem>
        <Table.HeaderItem className="pwapp-notification-list__sender">Sender</Table.HeaderItem>
        <Table.HeaderItem className="pwapp-notification-list__date">Date</Table.HeaderItem>
      </Table.Header>
      <Table.Body>
        {
          entries.map(entry => (
            <Table.Row
              className={
                classNames(
                  'pwapp-notification-list__item',
                  entry.isUnread && 'pwapp-notification-list__item--unread',
                )
              }
              key={entry.id}
              onClick={() => onView(entry)}
            >
              <Table.RowItem columnName="Subject">
                {entry.subject}
              </Table.RowItem>
              <Table.RowItem columnName="Sender" className="pwapp-notification-list__sender">
                {entry.sender}
              </Table.RowItem>
              <Table.RowItem columnName="Date" className="pwapp-notification-list__date">
                {entry.receivedAt}
              </Table.RowItem>
            </Table.Row>
          ))
        }
      </Table.Body>
    </Table>
  );

  const view = entries.length === 0 ? (
    <PageState
      image={noResultFoundImg}
      title="No results found"
      description="Please try to improve your filter"
    />
  ) : tableView;

  return (
    <PaginationTemplate
      spinner={<Spinner type="donut"/>}
      isProcessing={isProcessing}
      header={<AppBar/>}
      onLoadMore={page => onLoadNextPage(filterOptions, page)}
      page={page}
      total={total}
    >
      <FilterBar>
        <Input
          size="l"
          placeholder="Search"
          value={filterOptions.keyword}
          onChange={handleFilterChange('keyword', onFilterChange)}
          left={<Icons.Search/>}
          right={<Button onClick={() => onApplyFilter(filterOptions)} type="link" color="primary">Apply</Button>}
        />
      </FilterBar>
      <Card>
        {view}
      </Card>
    </PaginationTemplate>
  );
};

export default NotificationListPage;
