import React from 'react';
import { Card, Icons, List, PageState, Spinner } from '@paperwork/ui-widgets';

import './ReminderCard.scss';
import { Reminder } from '../../../../schema/Dashboard';

const img = require('../../../../assets/reminder.svg');
const error = require('../../../../assets/something-went-wrong.svg');

interface Props {
  reminder?: Reminder;
  isProcessing?: boolean;
  onViewNotifications: () => void;
  onViewForms: () => void;
}

export default ({ reminder, isProcessing, onViewNotifications, onViewForms }: Props) => (
  <Card header={<Card.Header icon={<img src={img}/>} primary="Reminder"/>}>
    {
      isProcessing && (<Spinner type="donut" size="m" title="Loading..."/>)
    }
    {
      reminder && (
        <List>
          <List.Item onClick={onViewNotifications}>
            <Icons.Message className="pwapp-reminder__icon"/>
            You have <span className="pwapp-reminder__keyword">{reminder.unreadNotificationCount}</span> unread notifications
          </List.Item>
          <List.Item onClick={onViewForms}>
            <Icons.Form className="pwapp-reminder__icon"/>
            You have <span className="pwapp-reminder__keyword">{reminder.dueFormCount}</span> forms will be due in 3 days
          </List.Item>
        </List>
      )
    }
    {
      !isProcessing && !reminder && (
        <PageState image={error} title="Service not available" description="Please try again later"/>
      )
    }
  </Card >
);