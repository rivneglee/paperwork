import React from 'react';
import { connect } from 'react-redux';

import { DetailProvider, DetailProviderState } from '../../../../service/template';
import { StoreState } from '../../../../store';
import { getAuthentication } from '../../../../store/selectors';
import TemplateDetailPage from '../components/TemplateDetailPage';
import { getIsPageEdited, getTemplateDetail } from '../state/selectors';
import { createLoadTemplateDetailAction } from '../state/actions';

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
  >
    {
      ({ template, isProcessing }: DetailProviderState) => {
        if (template) {
          dispatch(createLoadTemplateDetailAction(template));
        }

        return (
          <View
            isProcessing={isProcessing}
          />
        );
      }
    }
  </DetailProvider>
));
