import React from 'react';
import { connect } from 'react-redux';

import { DetailProvider, DetailProviderState } from '../../../service/dataSource';
import { StoreState } from '../../../store';
import Spinner from '../../../components/PageTransitionSpinner/Spinner';
import DataSourceDetailPage from './components/DataSourceDetailPage';

const mapProviderStateToProps = (state: StoreState, ownProps: any) => ({
  params: ownProps.match.params,
});

export default connect(mapProviderStateToProps)(({ dispatch, params }: any) => (
  <DetailProvider spinner={<Spinner />} userId={params.userId} dataSourceId={params.dataSourceId}>
    {
      ({ dataSource }: DetailProviderState) => {
        if (!dataSource) return null;
        return (<DataSourceDetailPage dataSource={dataSource} />);
      }
    }
  </DetailProvider>
));
