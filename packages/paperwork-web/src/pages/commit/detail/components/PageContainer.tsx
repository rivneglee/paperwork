import React from 'react';
import { connect } from 'react-redux';

import { DetailProvider, DetailProviderState } from '../../../../service/commit';
import { StoreState } from '../../../../store';
import { getAuthentication } from '../../../../store/selectors';
import CommitDetailPage from '../components/PageSwitcher';
import { getCommitDetail, getFormMode, getSucceedMessage } from '../state/selectors';
import { createLoadCommitDetailAction, createSetSucceedMessageAction, createUpdateItemValueAction } from '../state/actions';
import { CommitDetail } from '../../../../schema/Commit';

const mapStateToViewProps = (state: StoreState) => ({
  commit: getCommitDetail(state),
  succeedMessage: getSucceedMessage(state),
  mode: getFormMode(state),
});

const mapStateToProviderProps = (state: StoreState, ownProps: any) => ({
  params: ownProps.match.params,
  authentication: getAuthentication(state),
});

const View = connect(mapStateToViewProps)(CommitDetailPage);

export default connect(mapStateToProviderProps)(({ dispatch, params }: any) => (
  <DetailProvider
    formId={params.formId}
    commitId={params.commitId}
    preLoad
  >
    {
      ({ commit, create, isProcessing }: DetailProviderState) => {
        if (commit) {
          dispatch(createLoadCommitDetailAction(commit));
        }

        const onChange = (itemId: string, value: any) => (
          dispatch(createUpdateItemValueAction(itemId, value))
        );

        const onSubmit = async (commit: CommitDetail) => {
          console.log(JSON.stringify(commit));
          const succeedMessage = await create(commit);
          dispatch(createSetSucceedMessageAction(succeedMessage));
        };

        return (
          <View
            onSubmit={onSubmit}
            onChange={onChange}
            isProcessing={isProcessing}
          />
        );
      }
    }
  </DetailProvider>
));
