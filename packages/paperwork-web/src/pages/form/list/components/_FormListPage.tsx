import React, { FunctionComponent } from 'react';
import {
  PaginationTemplate,
  Card,
  PageState,
  Table,
  Button,
  Input,
  Icons, IconButton, Tooltip,
} from '@paperwork/ui-widgets';
import Spinner from '../../../../components/PageTransitionSpinner/Spinner';

import { FilterOption, FilterOptions } from './FormListPage';
import { FormItem } from './FormInfoCard';
import FilterBar from '../../../../lite/FilterBar/FilterBar';
import AppBar from '../../../../lite/AppBar/AppBar';
import QRCode from '../../../../components/QRCode/QRCode';
const noResultFoundImg = require('../../../../assets/no-results-found.svg');

interface Props {
  entries: FormItem[];
  page: number;
  total: number;
  onLoadNextPage: (filterOptions: FilterOptions, page: number) => void;
  onApplyFilter: (filterOptions: FilterOptions) => void;
  onFilterChange: (option: FilterOption) => void;
  filterOptions: FilterOptions;
  onViewCommits: (formId: string) => void;
  isProcessing?: boolean;
  onEdit: (id: string) => void;
  onCreateNew: (withDefaultDs: boolean) => void;
}

const handleFilterChange = (key: string, handler: any) => (e: any) => handler({ key, value: e.target.value });

const FormListPage: FunctionComponent<Props> = ({
  entries,
  onLoadNextPage,
  onApplyFilter,
  onEdit,
  onCreateNew,
  onFilterChange,
  onViewCommits,
  filterOptions,
  page,
  total,
  isProcessing,
}) => (
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
      <Button onClick={() => onCreateNew(true)} size="l" color="secondary">Create</Button>
    </FilterBar>
    <Card>
      {
        entries.length === 0 && (
          <PageState
            image={noResultFoundImg}
            title="No results found"
            description="Please try to improve your filter or create a new template"
          />
        )
      }
      {
        entries.length > 0 && (
          <Table>
            <Table.Header>
              <Table.HeaderItem>Form name</Table.HeaderItem>
              <Table.HeaderItem>Form status</Table.HeaderItem>
              <Table.HeaderItem>Close date</Table.HeaderItem>
              <Table.HeaderItem>Actions</Table.HeaderItem>
            </Table.Header>
            <Table.Body>
              {
                entries.map(entry => (
                  <Table.Row key={entry.id}>
                    <Table.RowItem columnName="Form name">
                      {entry.name}
                    </Table.RowItem>
                    <Table.RowItem columnName="Form status">
                      {entry.status}
                    </Table.RowItem>
                    <Table.RowItem columnName="Close date">
                        {entry.closeDate}
                    </Table.RowItem>
                    <Table.RowItem columnName="Actions">
                      <Button type="link" color="secondary" onClick={() => onEdit(entry.id)}>Edit</Button>
                      <Button type="link" color="secondary" onClick={() => onViewCommits(entry.id)}>Commits</Button>
                      <Tooltip placement="top" content={
                        <QRCode url={entry.newCommitUrl}/>
                      }>
                        <IconButton><Icons.QRCode/></IconButton>
                      </Tooltip>
                    </Table.RowItem>
                  </Table.Row>
                ))
              }
            </Table.Body>
          </Table>
        )
      }
    </Card>
  </PaginationTemplate>
);

export default FormListPage;
