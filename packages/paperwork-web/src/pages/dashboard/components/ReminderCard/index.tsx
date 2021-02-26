import React from 'react';
import { connect } from 'react-redux';

import { ReminderProvider, ReminderProviderState } from '../../../../service/dashboard';
import { StoreState } from '../../../../store';
import { getAuthentication } from '../../../../store/selectors';
import { Authentication } from '../../../../schema/User';
import ReminderCard from './ReminderCard';

interface Props {
  authentication: Authentication;
  onViewNotifications: () => void;
  onViewForms: () => void;
}

const mapStateToProps = (state: StoreState) => ({
  authentication: getAuthentication(state),
});

const View = ({ authentication, onViewNotifications, onViewForms }: Props) => (
  <ReminderProvider user={authentication.user} preLoad>
    {({ reminder, isProcessing }: ReminderProviderState) => {
      return (
        <ReminderCard
          onViewNotifications={onViewNotifications}
          onViewForms={onViewForms}
          isProcessing={isProcessing}
          reminder={reminder}
        />
      );
    }}
  </ReminderProvider>
);

export default connect(mapStateToProps)(View);