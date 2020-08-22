import { ReportDetail } from '../../schema/Report';
import { DataSource } from '../../schema/DataSource';

export const getSaveRequestPayload = (report: ReportDetail) => {
  const { items = {}, ...otherProps } = report;
  const newItems = Object.keys(items).reduce((result, key) => {
    const item = items[key];
    if (!item) return result;
    const { dataSources, ...restProps } = item;
    if (dataSources && Object.values(dataSources).length > 0) {
      const transformedDataSources = Object.keys(dataSources).reduce((result, key) => {
        const { id, fields } = dataSources[key] as DataSource;
        return {
          ...result as object,
          [id]: {
            id,
            fields: fields.map(field => field.id),
          },
        };
      }, {});
      return {
        ...result,
        [key]: {
          ...restProps,
          dataSources: transformedDataSources,
        },
      };
    }
    return {
      ...result,
      [key]: {
        ...restProps,
      },
    };
  }, {});

  return {
    ...otherProps,
    items: newItems,
  };
};
