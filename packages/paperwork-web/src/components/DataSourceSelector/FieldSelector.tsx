import React from 'react';
import { connect } from 'react-redux';
import { Select, SelectOption, Spinner } from '@paperwork/ui-widgets';

import { DetailProvider, DetailProviderState } from '../../service/dataSource';
import { StoreState } from '../../store';
import { getAuthentication } from '../../store/selectors';
import { Authentication } from '../../schema/User';

interface Props {
  label?: string;
  labelPlacement?: 'top' | 'left';
  value?: any;
  onChange: (selection: any) => void;
  authentication: Authentication;
  dataSourceId: string;
  isMultipleSelect?: boolean;
}

const mapStateToProps = (state: StoreState) => ({
  authentication: getAuthentication(state),
});

const FieldSelector = ({
  authentication,
  dataSourceId,
  label,
  labelPlacement,
  value,
  onChange,
  isMultipleSelect,
}: Props) => (
  <DetailProvider
    spinner={<Spinner type="ellipsis" size="s"/>}
    userId={authentication.user.id}
    dataSourceId={dataSourceId}
    preLoad
  >
    {
      ({ dataSource, isProcessing }: DetailProviderState) => {
        if (!dataSource || isProcessing) return null;
        const { fields } = dataSource;
        const options = fields.map(({ id, name }) => ({
          value: id,
          label: name,
        }));
        const onSelectField = (_: any, fields: SelectOption | SelectOption[]) => {
          onChange(fields);
        };
        return (
          <Select
            isRequired
            label={label}
            labelPlacement={labelPlacement}
            selectedValue={value}
            onChange={onSelectField}
            options={options}
            isMultipleSelect={isMultipleSelect}
          />
        );
      }
    }
  </DetailProvider>
);

export default connect(mapStateToProps)(FieldSelector);
