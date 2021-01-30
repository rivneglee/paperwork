import { FormDetail } from '../../schema/Form';

export const getWriteRequestPayload = (form: FormDetail) => {
  const {
    items = {},
    author,
    createdAt,
    status,
    receivedCommits,
    targetCommits = 0,
    maxCommits = 0,
    ...cleanedForm
  } = form;
  const newItems = Object.keys(items).reduce((result, key) => {
    const item = items[key];
    if (!item) return result;
    const { targetDataSource, creatingDataSource, ...restProps } = item;
    if (targetDataSource && targetDataSource.name) {
      return {
        ...result,
        [key]: {
          ...restProps,
          targetDataSource: {
            id: targetDataSource.id,
            fieldId: targetDataSource.fieldId,
          },
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
    targetCommits: Number(targetCommits),
    maxCommits: Number(maxCommits),
    items: newItems,
  };
};
