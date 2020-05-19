import React, { FunctionComponent } from 'react';
import { BaseTemplate, Card, QuickAdd, Search, Icons, PictureChip, IconButton } from '@paperwork/ui-widgets';
import AppBar from '../../../../components/AppBar';
import StickySideBar from '../../../../components/StickySideBar/StickySideBar';

import './TemplateListPage.scss';
import { TemplateList } from '../../../../schema/Template';

interface Props {
  entries: TemplateList;
}

const TemplateListPage: FunctionComponent<Props> = ({
  entries,
}) => (
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
        {
          entries.map(entry => (
            <PictureChip
              key={entry.id}
              className="pwapp-template-list__card"
              color={entry.themeColor}
              title={entry.name}
              subTitle={entry.author.displayName}
              imageUrl={entry.heroImage}
              content="College activity enrollment is available now. Getting involve by finishing application form before 08/08/2023"
              footer={
                <div className="pwapp-template-list__card-footer">
                  <IconButton><Icons.Duplicate/></IconButton>
                  <IconButton><Icons.Info/></IconButton>
                  <IconButton><Icons.Trash/></IconButton>
                </div>
              }
            />
          ))
        }
      </div>
    </Card>
  </BaseTemplate>
);

export default TemplateListPage;
