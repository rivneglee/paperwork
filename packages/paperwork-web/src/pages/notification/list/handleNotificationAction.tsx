import { NotificationEventType } from '../../../schema/Notification';

export default (notification: any) => {
  if (notification.event.type === NotificationEventType.FILLING_FORM_INVITATION) {
    window.open(`/f/${notification.event.refId}/c/new`, '_blank');
  }
  if (notification.event.type === NotificationEventType.SHARED_REPORT) {
    window.open(`/r/${notification.event.refId}`, '_blank');
  }
};