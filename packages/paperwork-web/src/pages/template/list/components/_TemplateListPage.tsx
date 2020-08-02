import React, { FunctionComponent } from 'react';
import {
  PaginationTemplate,
  PageState,
  Table,
  Input,
  Button,
  Icons,
  Card,
} from '@paperwork/ui-widgets';
import Spinner from '../../../../components/PageTransitionSpinner/Spinner';

import { Template } from '../../../../schema/Template';
import { FilterOption, FilterOptions } from './TemplateListPage';
import AppBar from '../../../../lite/AppBar/AppBar';
import FilterBar from '../../../../lite/FilterBar/FilterBar';
const noResultFoundImg = require('../../../../assets/no-results-found.svg');

interface Props {
  entries: Template[];
  page: number;
  total: number;
  onLoadNextPage: (filterOptions: FilterOptions, page: number) => void;
  onApplyFilter: (filterOptions: FilterOptions) => void;
  onEdit: (id: string) => void;
  onCreateNew: () => void;
  onCreateForm: (id: string) => void;
  onFilterChange: (option: FilterOption) => void;
  filterOptions: FilterOptions;
  isProcessing?: boolean;
}

const handleFilterChange = (key: string, handler: any) => (e: any) => handler({ key, value: e.target.value });

const TemplateListPage: FunctionComponent<Props> = ({
  entries,
  onLoadNextPage,
  onApplyFilter,
  onEdit,
  onCreateNew,
  onCreateForm,
  onFilterChange,
  filterOptions,
  page,
  total,
  isProcessing,
}) => (
  <PaginationTemplate
    spinner={<Spinner type="donut"/>}
    isProcessing={isProcessing}
    header={<AppBar activeMenuId="templates"/>}
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
      <Button onClick={onCreateNew} size="l" color="secondary">Create</Button>
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
              <Table.HeaderItem>Template name</Table.HeaderItem>
              <Table.HeaderItem>Author</Table.HeaderItem>
              <Table.HeaderItem>Actions</Table.HeaderItem>
            </Table.Header>
            <Table.Body>
              {
                entries.map(entry => (
                  <Table.Row key={entry.id}>
                    <Table.RowItem columnName="Committer">
                      {entry.name}
                    </Table.RowItem>
                    <Table.RowItem columnName="Date">
                      {entry.author.displayName}
                    </Table.RowItem>
                    <Table.RowItem columnName="Actions">
                      <Button type="link" color="secondary" onClick={() => onEdit(entry.id)}>Edit</Button>
                      <Button type="link" color="secondary" onClick={() => onCreateForm(entry.id)}>Create form</Button>
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

export default TemplateListPage;
