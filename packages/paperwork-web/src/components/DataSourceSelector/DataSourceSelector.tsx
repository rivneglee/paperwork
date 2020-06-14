import React from 'react';
import { connect } from 'react-redux';

import { AutoComplete } from '@paperwork/ui-widgets';
import { ListProvider, ListProviderState } from '../../service/dataSource';
import { StoreState } from '../../store';
import { getAuthentication } from '../../store/selectors';
import { Authentication } from '../../schema/User';

interface Props {
  label?: string;
  labelPlacement?: 'top' | 'left';
  value?: any | any[];
  isMultipleSelect?: boolean;
  onChange: (selection: any) => void;
  authentication: Authentication;
}

const mapStateToProps = (state: StoreState) => ({
  authentication: getAuthentication(state),
});

const DataSourceSelector = ({ authentication, label, labelPlacement, value, isMultipleSelect = false, onChange }: Props) => (
  <ListProvider userId={authentication.user.id}>
    {({ list }: ListProviderState) => {
      const loadOptions = async (inputValue: string) => await list({ keyword: inputValue });
      return (
        <AutoComplete
          isRequired
          label={label}
          labelPlacement={labelPlacement}
          loadOptions={loadOptions}
          onChange={onChange}
          value={value}
          isMultipleSelect={isMultipleSelect}
          getOptionLabel={option => option.name}
          getOptionValue={option => option.id}
        />
      );
    }}
  </ListProvider>
);

export default connect(mapStateToProps)(DataSourceSelector);
