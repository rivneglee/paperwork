import React from 'react';

import { AutoComplete } from '@paperwork/ui-widgets';
import { ListProvider, ListProviderState } from '../../service/collaborator';

interface Props {
  value: any | any[];
  isMultipleSelect?: boolean;
  onChange: (selection: any) => void;
}

export default ({ value, isMultipleSelect = false, onChange }: Props) => (
  <ListProvider>
    {({ list }: ListProviderState) => {
      const loadOptions = async (inputValue: string) => await list({ keyword: inputValue });

      return (
        <AutoComplete
          loadOptions={loadOptions}
          onChange={onChange}
          value={value}
          isMultipleSelect={isMultipleSelect}
          getOptionLabel={option => option.displayName}
          getOptionValue={option => option.id}
        />
      );
    }}
  </ListProvider>
);
