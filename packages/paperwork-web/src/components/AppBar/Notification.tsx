import React  from 'react';
import { Balloon } from '@paperwork/ui-widgets';

import { Authentication } from '../../schema/User';
import { StoreState } from '../../store';
import { getAuthentication, getUnreadNotifications } from '../../store/selectors';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ListProvider, ListProviderState } from '../../service/notification';
import { createLoadNotificationUpdateAction } from '../../store/actions';

interface Props {
  unread: number;
  authentication: Authentication;
  dispatch: Dispatch;
}

const mapStateToProps = (state: StoreState) => ({
  authentication: getAuthentication(state),
  unread: getUnreadNotifications(state),
});

const CHECK_INTERVAL = 5000;

const DataSourceSelector = ({ dispatch, authentication, unread }: Props) => (
  <ListProvider userId={authentication.user.id}>
    {({ checkUpdate, isInitializing }: ListProviderState) => {
      const periodicalCheck = async () => {
        const notificationUpdate = await checkUpdate();
        dispatch(createLoadNotificationUpdateAction(notificationUpdate));
        setTimeout(periodicalCheck, CHECK_INTERVAL);
      };

      if (isInitializing) {
        periodicalCheck();
      }

      if (!unread) return <>Notification</>;
      return (
        <Balloon content={unread}>
          Notification
        </Balloon>
      );
    }}
  </ListProvider>
);

export default connect(mapStateToProps)(DataSourceSelector);
