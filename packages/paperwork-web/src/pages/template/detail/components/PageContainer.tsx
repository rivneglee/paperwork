import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { DetailProvider, DetailProviderState } from '../../../../service/template';
import { StoreState } from '../../../../store';
import { getAuthentication } from '../../../../store/selectors';
import TemplateDetailPage from '../components/PageSwitcher';
import { getIsPageEdited, getTemplateDetail } from '../state/selectors';
import { createLoadTemplateDetailAction, createUpdateTemplateAction } from '../state/actions';
import { TemplateDetail } from '../../../../schema/Template';

const mapStateToViewProps = (state: StoreState) => ({
  template: getTemplateDetail(state),
  isPageEdited: getIsPageEdited(state),
});

const mapStateToProviderProps = (state: StoreState, ownProps: any) => ({
  params: ownProps.match.params,
  authentication: getAuthentication(state),
});

const View = connect(mapStateToViewProps)(TemplateDetailPage);

export default connect(mapStateToProviderProps)(({ dispatch, params, authentication }: any) => (
  <DetailProvider
    userId={authentication.user.id}
    templateId={params.templateId}
    preLoad
  >
    {
      ({ template, isProcessing, remove, create, update }: DetailProviderState) => {
        if (template) {
          dispatch(createLoadTemplateDetailAction(template));
        }

        const navigateToList = () => dispatch(push('/templates'));

        const onUpdate = (template: TemplateDetail) => dispatch(createUpdateTemplateAction(template));

        const onCancel = () => navigateToList();

        const onDelete = async () => {
          await remove();
          navigateToList();
        };

        const onSave = async (template: TemplateDetail) => {
          const saveHandler = params.templateId === 'new' ? create : update;
          await saveHandler(template);
          navigateToList();
        };

        return (
          <View
            isCreating={params.templateId === 'new'}
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
