import React  from 'react';
import { Balloon, IconButton, Icons } from '@paperwork/ui-widgets';
import { Link } from 'react-router-dom';

import { StoreState } from '../../store';
import { getCurrentUserId, getUnreadNotifications } from '../../store/selectors';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Provider, ListProviderState } from '../../service/notification';
import { createLoadNotificationUpdateAction } from '../../store/actions';

interface Props {
  unread: number;
  userId?: string;
  dispatch: Dispatch;
}

const mapStateToProps = (state: StoreState) => ({
  userId: getCurrentUserId(state),
  unread: getUnreadNotifications(state),
});

const CHECK_INTERVAL = 10000;

const Notifications = ({ dispatch, userId, unread }: Props) => (
  userId ? <Provider userId={userId}>
    {({ checkUpdate, isInitializing }: ListProviderState) => {
      const periodicalCheck = async () => {
        const notificationUpdate = await checkUpdate();
        dispatch(createLoadNotificationUpdateAction(notificationUpdate));
        setTimeout(periodicalCheck, CHECK_INTERVAL);
      };

      if (isInitializing) {
        periodicalCheck();
      }

      const button = (
        <Link to="/notifications">
          <IconButton>
            <Icons.Message/>
          </IconButton>
        </Link>
      );

      if (!unread) return button;
      return (
        <Balloon content={unread}>
          {button}
        </Balloon>
      );
    }}
  </Provider> : null
);

export default connect(mapStateToProps)(Notifications);
