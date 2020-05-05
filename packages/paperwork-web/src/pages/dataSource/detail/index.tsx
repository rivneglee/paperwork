import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { DetailProvider, DetailProviderState } from '../../../service/dataSource';
import { StoreState } from '../../../store';
import Spinner from '../../../components/PageTransitionSpinner/Spinner';
import DataSourceDetailPage from './components/DataSourceDetailPage';
import { DataSource, Field } from '../../../schema/DataSource';
import {
  createAddFieldAction,
  createLoadDataSourceDetailAction,
  createRemoveFieldAction,
  createUpdateDetailAction,
  createUpdateFieldAction,
} from './state/actions';
import { getDataSourceDetail, getIsPageEdited } from './state/selectors';

const mapStateToViewProps = (state: StoreState) => ({
  dataSource: getDataSourceDetail(state),
  isPageEdited: getIsPageEdited(state),
});

const mapStateToProviderProps = (state: StoreState, ownProps: any) => ({
  params: ownProps.match.params,
});

const View = connect(mapStateToViewProps)(DataSourceDetailPage);

export default connect(mapStateToProviderProps)(({ dispatch, params }: any) => (
  <DetailProvider
    spinner={<Spinner />}
    userId={params.userId}
    dataSourceId={params.dataSourceId}
  >
    {
      ({ dataSource, update, create }: DetailProviderState) => {
        if (dataSource) {
          dispatch(createLoadDataSourceDetailAction(dataSource));
        }

        const navigateToList = () => dispatch(push(`/${params.userId}/dataSource`));

        const onUpdateDetail = (key: string, value: any) => {
          dispatch(createUpdateDetailAction(key, value));
        };

        const onAddField = ({ id }: Field, key: string, value: string) => {
          dispatch(createAddFieldAction(id, key, value));
        };

        const onUpdateField = (index: number, key: string, value: string) => {
          dispatch(createUpdateFieldAction(index, key, value));
        };

        const onRemoveField = (index: number) => {
          dispatch(createRemoveFieldAction(index));
        };

        const onSave = async (dataSource: DataSource) => {
          const saveHandler = params.dataSourceId === 'new' ? create : update;
          await saveHandler(dataSource);
          navigateToList();
        };

        return (
          <View
            onSave={onSave}
            onUpdateDetail={onUpdateDetail}
            onAddField={onAddField}
            onUpdateField={onUpdateField}
            onRemoveField={onRemoveField}
            onCancel={navigateToList}
          />
        );
      }
    }
  </DetailProvider>
));
