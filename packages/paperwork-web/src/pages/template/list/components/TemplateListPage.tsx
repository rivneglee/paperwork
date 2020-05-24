import React, { FunctionComponent } from 'react';
import { PaginationTemplate, Card, QuickAdd, Search, Icons, PictureChip, IconButton } from '@paperwork/ui-widgets';
import AppBar from '../../../../components/AppBar';
import Spinner from '../../../../components/PageTransitionSpinner/Spinner';
import StickySideBar from '../../../../components/StickySideBar/StickySideBar';

import './TemplateListPage.scss';
import { Template } from '../../../../schema/Template';

interface Props {
  entries: Template[];
  page: number;
  total: number;
  onLoadNextPage: () => void;
  isProcessing?: boolean;
}

const TemplateListPage: FunctionComponent<Props> = ({
  entries,
  onLoadNextPage,
  page,
  total,
  isProcessing,
}) => {
  const spinner = page < 1 ? <Spinner/> : undefined;
  return (
    <PaginationTemplate
      spinner={spinner}
      isProcessing={isProcessing}
      header={<AppBar activeMenuId="templates"/>}
      onLoadMore={onLoadNextPage}
      page={page}
      total={total}
    >
      <Card header={<Card.Header primary="Templates"/>}>
        <StickySideBar>
          <Search placeholder="Search" />
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
    </PaginationTemplate>
  );
};

export default TemplateListPage;
