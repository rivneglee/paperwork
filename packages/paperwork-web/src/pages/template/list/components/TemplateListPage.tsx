import React, { FunctionComponent } from 'react';
import {
  PaginationTemplate,
  Card,
  QuickAdd,
  Search,
  Icons,
  PictureChip,
  IconButton,
  Tooltip, PageState,
} from '@paperwork/ui-widgets';
import AppBar from '../../../../components/AppBar';
import Spinner from '../../../../components/PageTransitionSpinner/Spinner';
import StickySideBar from '../../../../components/StickySideBar/StickySideBar';

import './TemplateListPage.scss';
import { Template } from '../../../../schema/Template';
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

export interface FilterOption {
  key: string;
  value: number | string;
}

export interface FilterOptions {
  keyword?: string;
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
    spinner={<Spinner/>}
    isProcessing={isProcessing}
    header={<AppBar activeMenuId="templates"/>}
    onLoadMore={page => onLoadNextPage(filterOptions, page)}
    page={page}
    total={total}
  >
    <Card header={<Card.Header primary="My templates"/>}>
      <StickySideBar>
        <Search
          placeholder="Search"
          value={filterOptions.keyword}
          onChange={handleFilterChange('keyword', onFilterChange)}
          onApply={() => onApplyFilter(filterOptions)}
        />
        <QuickAdd color="secondary">
          <QuickAdd.Item onClick={onCreateNew} icon={<Icons.Template/>} tooltip="Create an empty template"/>
        </QuickAdd>
      </StickySideBar>
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
          <div className="pwapp-template-list">
            {
              entries.map(entry => (
                <PictureChip
                  key={entry.id}
                  className="pwapp-template-list__card"
                  color={entry.theme}
                  title={entry.name}
                  subTitle={entry.author.displayName}
                  imageUrl={entry.heroImage}
                  content={entry.name}
                  footer={
                    <div className="pwapp-template-list__card-footer">
                      <Tooltip placement="top" content="Edit template">
                        <IconButton onClick={() => onEdit(entry.id)}><Icons.Edit/></IconButton>
                      </Tooltip>
                      <Tooltip placement="top" content="Use template">
                        <IconButton onClick={() => onCreateForm(entry.id)}><Icons.Duplicate/></IconButton>
                      </Tooltip>
                    </div>
                  }
                />
              ))
            }
          </div>
        )
      }
    </Card>
  </PaginationTemplate>
);

export default TemplateListPage;
