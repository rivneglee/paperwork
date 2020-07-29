import { FormDetail } from '../../schema/Form';

export const getWriteRequestPayload = (form: FormDetail) => {
  const { items = {}, author, createdAt, status, receivedCommits, ...cleanedForm } = form;
  const newItems = Object.keys(items).reduce((result, key) => {
    const item = items[key];
    if (!item) return result;
    const { targetDataSource, creatingDataSource, ...restProps } = item;
    if (targetDataSource && targetDataSource.fieldId && targetDataSource.id) {
      return {
        ...result,
        [key]: {
          ...restProps,
          targetDataSourceId: targetDataSource.id,
          targetFieldId: targetDataSource.fieldId,
        },
      };
    }
    if (creatingDataSource) {
      return {
        ...result,
        [key]: {
          ...restProps,
          targetFieldName: creatingDataSource.fieldName || item.label,
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
    ...cleanedForm,
    items: newItems,
  };
};
