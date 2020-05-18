import React, { FunctionComponent } from 'react';
import { BaseTemplate, Card, QuickAdd, Search, Icons, PictureChip, IconButton } from '@paperwork/ui-widgets';
import AppBar from '../../../../components/AppBar';
import StickySideBar from '../../../../components/StickySideBar/StickySideBar';

import './TemplateListPage.scss';

interface Props {}

const TemplateListPage: FunctionComponent<Props> = ({}) => (
  <BaseTemplate
    header={<AppBar activeMenuId="template-store"/>}
  >
    <Card header={<h3>Template store</h3>}>
      <StickySideBar>
        <Search
          placeholder="Search"
        />
        <QuickAdd color="secondary">
        </QuickAdd>
      </StickySideBar>
      <div className="pwapp-template-list">
        <PictureChip
          className="pwapp-template-list__card"
          title="College Activity"
          subTitle="End date: 08/08/2023"
          imageUrl="https://gd-templates.jinshujufiles.com/template_market/clv9pW-preview-2a6da4c7-cb84-4a5b-ae28-306f398f7fa8.jpg"
          content="College activity enrollment is available now. Getting involve by finishing application form before 08/08/2023"
          footer={
            <div style={{
              display: 'flex',
              justifyContent: 'flex-start',
              width: '100%',
            }}>
              <IconButton><Icons.Duplicate/></IconButton>
              <IconButton><Icons.Info/></IconButton>
              <IconButton><Icons.Trash/></IconButton>
            </div>
          }
        />
        <PictureChip
          className="pwapp-template-list__card"
          color="red"
          title="College Activity"
          subTitle="End date: 08/08/2023"
          imageUrl="https://gd-templates.jinshujufiles.com/template_market/0bQN1I-cover-6d64f76e-bc40-4c86-bf30-a130fa65b8c0.jpg"
          content="College activity enrollment is available now. Getting involve by finishing application form before 08/08/2023"
          footer={
            <div style={{
              display: 'flex',
              justifyContent: 'flex-start',
              width: '100%',
            }}>
              <IconButton><Icons.Duplicate/></IconButton>
              <IconButton><Icons.Info/></IconButton>
              <IconButton><Icons.Trash/></IconButton>
            </div>
          }
        />
        <PictureChip
          className="pwapp-template-list__card"
          color="pink"
          title="College Activity"
          subTitle="End date: 08/08/2023"
          imageUrl="https://gd-templates.jinshujufiles.com/template_market/Qp6CVw-2ae98ff24ab788130037c8d2913ac375.jpeg"
          content="College activity enrollment is available now. Getting involve by finishing application form before 08/08/2023"
          footer={
            <div style={{
              display: 'flex',
              justifyContent: 'flex-start',
              width: '100%',
            }}>
              <IconButton><Icons.Duplicate/></IconButton>
              <IconButton><Icons.Info/></IconButton>
              <IconButton><Icons.Trash/></IconButton>
            </div>
          }
        />
        <PictureChip
          className="pwapp-template-list__card"
          title="College Activity"
          color="orange"
          subTitle="End date: 08/08/2023"
          imageUrl="https://gd-templates.jinshujufiles.com/template_market/clv9pW-preview-2a6da4c7-cb84-4a5b-ae28-306f398f7fa8.jpg"
          content="College activity enrollment is available now. Getting involve by finishing application form before 08/08/2023"
          footer={
            <div style={{
              display: 'flex',
              justifyContent: 'flex-start',
              width: '100%',
            }}>
              <IconButton><Icons.Duplicate/></IconButton>
              <IconButton><Icons.Info/></IconButton>
              <IconButton><Icons.Trash/></IconButton>
            </div>
          }
        />
        <PictureChip
          className="pwapp-template-list__card"
          color="pink"
          title="College Activity"
          subTitle="End date: 08/08/2023"
          imageUrl="https://gd-templates.jinshujufiles.com/template_market/Qp6CVw-2ae98ff24ab788130037c8d2913ac375.jpeg"
          content="College activity enrollment is available now. Getting involve by finishing application form before 08/08/2023"
          footer={
            <div style={{
              display: 'flex',
              justifyContent: 'flex-start',
              width: '100%',
            }}>
              <IconButton><Icons.Duplicate/></IconButton>
              <IconButton><Icons.Info/></IconButton>
              <IconButton><Icons.Trash/></IconButton>
            </div>
          }
        />
      </div>
    </Card>
  </BaseTemplate>
);

export default TemplateListPage;
