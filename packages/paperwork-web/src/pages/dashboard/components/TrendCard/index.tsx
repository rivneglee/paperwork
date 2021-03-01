import React from 'react';
import { connect } from 'react-redux';

import { TrendProvider, TrendProviderState } from '../../../../service/dashboard';
import { StoreState } from '../../../../store';
import { getAuthentication } from '../../../../store/selectors';
import { Authentication } from '../../../../schema/User';
import TrendCard from './TrendCard';

interface Props {
  authentication: Authentication;
}

const mapStateToProps = (state: StoreState) => ({
  authentication: getAuthentication(state),
});

const View = ({ authentication }: Props) => (
  <TrendProvider user={authentication.user} preLoad>
    {({ trend, isProcessing }: TrendProviderState) => <TrendCard isProcessing={isProcessing} trend={trend}/>}
  </TrendProvider>
);

export default connect(mapStateToProps)(View);