import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { DetailProvider, DetailProviderState } from '../../../../service/form';
import { StoreState } from '../../../../store';
import { getAuthentication } from '../../../../store/selectors';
import FormDetailPage from '../components/FormDetailPage';
import { getFormDetail, getIsPageEdited } from '../state/selectors';
import { createLoadFormDetailAction, createUpdateFormAction } from '../state/actions';
import { FormDetail } from '../../../../schema/Form';

const mapStateToViewProps = (state: StoreState) => ({
  form: getFormDetail(state),
  isPageEdited: getIsPageEdited(state),
});

const mapStateToProviderProps = (state: StoreState, ownProps: any) => ({
  params: ownProps.match.params,
  authentication: getAuthentication(state),
});

const View = connect(mapStateToViewProps)(FormDetailPage);

export default connect(mapStateToProviderProps)(({ dispatch, params, authentication }: any) => (
  <DetailProvider
    userId={authentication.user.id}
    formId={params.formId}
    preLoad
  >
    {
      ({ form, isProcessing, remove, create, update }: DetailProviderState) => {
        if (form) {
          dispatch(createLoadFormDetailAction(form));
        }

        const navigateToList = () => dispatch(push('/forms'));

        const onUpdate = (form: FormDetail) => dispatch(createUpdateFormAction(form));

        const onCancel = () => navigateToList();

        const onDelete = async () => {
          await remove();
          navigateToList();
        };

        const onSave = async (form: FormDetail) => {
          const saveHandler = params.formId === 'new' ? create : update;
          await saveHandler(form);
          navigateToList();
        };

        return (
          <View
            isCreating={params.formId === 'new'}
            isProcessing={isProcessing}
            onUpdate={onUpdate}
            onCancel={onCancel}
            onDelete={onDelete}
            onSave={onSave}
          />
        );
      }
    }
  </DetailProvider>
));
