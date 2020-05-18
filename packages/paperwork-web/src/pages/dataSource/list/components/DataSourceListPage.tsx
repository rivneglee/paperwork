import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { List, BaseTemplate, Card, Badge, Search, Icons, QuickAdd, Tooltip, PageState } from '@paperwork/ui-widgets';
import AppBar from '../../../../components/AppBar';
import { UserIdentifier } from '../../../../schema/User';
import StickySideBar from '../../../../components/StickySideBar/StickySideBar';
import './DataSourceListPage.scss';
import noResultFoundImg from '../../../../assets/no-results-found.svg';

interface BadgeProps {
  color: 'secondary' | 'primary';
  text: string;
}

interface Entry {
  id: string;
  name: string;
  owner: UserIdentifier;
  badges: BadgeProps[];
  link: string;
}

export interface FilterOption {
  key: string;
  value: number | string;
}

export interface FilterOptions {
  keyword?: string;
}

interface Props {
  entries: Entry[];
  filterOptions: FilterOptions;
  onFilterChange: (option: FilterOption) => void;
  onApplyFilter: (filterOptions: FilterOptions) => void;
  onCreateNew: () => void;
}

const handleFilterChange = (key: string, handler: any) => (e: any) => handler({ key, value: e.target.value });

const DataSourceListPage: FunctionComponent<Props> = ({
  entries = [],
  filterOptions = {},
  onFilterChange,
  onApplyFilter,
  onCreateNew,
}) => (
  <BaseTemplate
    header={<AppBar activeMenuId="datasource" />}
  >
    <Card header={<h3>My Datasource</h3>}>
      <StickySideBar>
        <Search
          value={filterOptions.keyword}
          placeholder="Search"
          onChange={handleFilterChange('keyword', onFilterChange)}
          onApply={() => onApplyFilter(filterOptions)}
        />
        <QuickAdd color="secondary">
          <QuickAdd.Item onClick={onCreateNew} icon={<Icons.DataSource />} tooltip="Create empty datasource"/>
        </QuickAdd>
      </StickySideBar>
      {
        entries.length > 0 ? (
          <List>
            {
              entries.map(({ name, id, badges, link }) => (
                <List.Item key={id}>
                  <Link to={link} className="pwapp-datasource-list__row">
                    {name}
                    {
                      badges.map(({ color, text }) =>
                        <Tooltip
                          key={text}
                          placement="top"
                          content="You are not the owner of this datasource, but you have limited access to this datasource">
                          <Badge color={color}>{text}</Badge>
                        </Tooltip>,
                      )
                    }
                  </Link>
                </List.Item>
              ))
            }
          </List>
        ) : (
          <PageState
            image={noResultFoundImg}
            title="No results found"
            description="Please try to improve your filter and create some data"
          />
        )
      }
    </Card>
  </BaseTemplate>
);

export default DataSourceListPage;
