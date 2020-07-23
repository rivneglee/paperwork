import React, { FunctionComponent } from 'react';
import { Card, PageState, Icons, IconButton } from '@paperwork/ui-widgets';
import { SucceedMessage } from '../../schema/Form';

const successImg = require('../../assets/success.svg');

interface Props {
  successMessage?: SucceedMessage;
}

const SucceedState: FunctionComponent<Props> = ({
  successMessage = {},
}) => {
  const {
    title = 'You form have been submitted',
    subTitle = 'Nice one. Thanks for using PaperWork! You can click the links on below to share this form with your friends.',
  } = successMessage;

  return (
    <Card>
      <PageState
        image={successImg}
        title={title}
        description={subTitle}
        buttons={[
          <IconButton key="wechat"><Icons.WeChat/></IconButton>,
          <IconButton key="weblog"><Icons.WeBlog/></IconButton>,
          <IconButton key="facebook"><Icons.Facebook/></IconButton>,
          <IconButton key="twitter"><Icons.Twitter/></IconButton>,
          <IconButton key="linkedin"><Icons.LinkedIn/></IconButton>,
        ]}
      />
    </Card>
  );
};

export default SucceedState;
