import React from 'react';
import { Card, PageState, Button, Icons } from '@paperwork/ui-widgets';

import './SupportCard.scss';

const notification = require('../../../../assets/notification.svg');

interface Props {}

export default ({}: Props) => {
  const handleCreateIssue = () => window.open('https://github.com/rivneglee/paperwork-issues/issues/new?assignees=rivneglee&labels=&template=paperwork-issue---.md&title=New+support+ticket+for+paperwork', '_blank');
  return (
      <Card>
        <PageState
            image={notification}
            title="Need support?"
            description="You can log bugs or feature requests to our issue board."
            buttons={[
              <Button
                  onClick={handleCreateIssue}
                  icon={<Icons.Submit/>}
                  key="issue"
                  size="xl"
                  color="primary"
              >Report issue</Button>,
            ]}
        />
      </Card >
  );
};