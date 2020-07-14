import { FormDetail } from '../../schema/Form';

export const getWriteRequestPayload = (form: FormDetail) => {
  const { items = {}, author, createdAt, status, receivedCommits, ...cleanedForm } = form;
  const newItems = Object.keys(items).reduce((result, key) => {
    const item = items[key];
    if (!item) return result;
    const { targetDataSource, ...restProps } = item;
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
