import { SelectOption } from '@paperwork/ui-widgets';

export const getQuery = (state: any) => {
  if (!state || !state.dataSources) return;
  return (
    Object.values(state.dataSources).reduce((result: any, { id, fields = [] }: any) => ({
      ...result,
      [id]: {
        dataSourceId: id,
        fields: fields.map((f: SelectOption) => f.value),
      },
    }), {})
  );
};
