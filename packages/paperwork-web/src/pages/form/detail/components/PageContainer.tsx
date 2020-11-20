import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { DetailProvider, DetailProviderState } from '../../../../service/form';
import {
  DetailProvider as TemplateProvider,
  DetailProviderState  as TemplateProviderState,
} from '../../../../service/template';
import { StoreState } from '../../../../store';
import { getAuthentication, getQueryParams } from '../../../../store/selectors';
import FormDetailPage from '../components/PageSwitcher';
import { getFormDetail, getIsPageEdited, getIsPublic, getIsCreatingDefaultDs } from '../state/selectors';
import { defaultState } from '../state/reducers';
import { createLoadFormDetailAction, createUpdateFormAction } from '../state/actions';
import { FormDetail } from '../../../../schema/Form';
import Spinner from '../../../../components/PageTransitionSpinner/Spinner';

const mapStateToViewProps = (state: StoreState) => ({
  form: getFormDetail(state),
  isPageEdited: getIsPageEdited(state),
  isPublic: getIsPublic(state),
  isCreatingDefaultDs: getIsCreatingDefaultDs(state),
});

const mapStateToProviderProps = (state: StoreState, ownProps: any) => ({
  params: ownProps.match.params,
  authentication: getAuthentication(state),
  queryParams: getQueryParams(state),
  isCreatingDefaultDs: getIsCreatingDefaultDs(state),
});

const View = connect(mapStateToViewProps)(FormDetailPage);

export default connect(mapStateToProviderProps)(({ dispatch, params, authentication, queryParams }: any) => {
  const detailPageWrapper = (
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
  );

  if (params.formId === 'new' && queryParams.sourceTemplateId) {
    return (
      <TemplateProvider
        userId={authentication.user.id}
        templateId={queryParams.sourceTemplateId}
        preLoad
        spinner={<Spinner/>}
      >
        {
          ({ template }: TemplateProviderState) => {
            if (template) {
              const { name, layout, items } = template;
              dispatch(createLoadFormDetailAction({
                ...defaultState.form,
                name,
                layout,
                items,
              }));
            }
            return detailPageWrapper;
          }
        }
      </TemplateProvider>
    );
  }

  return detailPageWrapper;
});
