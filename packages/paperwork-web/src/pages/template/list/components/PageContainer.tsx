import React from 'react';
import { connect } from 'react-redux';

import TemplateListPage from './TemplateListPage';
import { StoreState } from '../../../../store';
import { getAuthentication } from '../../../../store/selectors';
import { ListProvider, ListProviderState } from '../../../../service/template';
import Spinner from '../../../../components/PageTransitionSpinner/Spinner';
import { getEntries, getPagination } from '../state/selectors';
import { createLoadTemplateListAction } from '../state/actions';

const mapStateToViewProps = (state: StoreState) => ({
  entries: getEntries(state),
  ...getPagination(state),
});

const mapStateToProviderProps = (state: StoreState, ownProps: any) => ({
  params: ownProps.match.params,
  authentication: getAuthentication(state),
});

const PageView = connect(mapStateToViewProps)(TemplateListPage);

export default connect(mapStateToProviderProps)(({ dispatch, params, authentication, ...otherProps }: any) => (
  <ListProvider spinner={<Spinner />} userId={authentication.user.id}>
    {({ templateList, list, isInitializing }: ListProviderState) => {
      if (isInitializing) {
        dispatch(createLoadTemplateListAction(templateList));
      }

      const onLoadNextPage = async (page: number) => {
        const nextPageOfList = await list({}, page);
        dispatch(createLoadTemplateListAction(nextPageOfList));
      };

      return (
        <PageView {...otherProps} onLoadNextPage={onLoadNextPage}/>);
    }}
  </ListProvider>
));
