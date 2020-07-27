import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { Badge, IconButton, Icons, Tooltip } from '@paperwork/ui-widgets';

import './FormInfoCard.scss';
import ProgressChart from './ProgressChart';
import { Status } from '../../../../schema/Form';
import QRCode from '../../../../components/QRCode/QRCode';

export interface FormItem {
  id: string;
  name: string;
  status: string;
  isPublic: boolean;
  createdAt: string;
  closeDate: string;
  targetCommits: string | number;
  maxCommits: string | number;
  receivedCommits: number;
  targetGap: number;
  maxGap: number;
  theme?: string;
  progress?: string;
  statusBadgeColor?: any;
  newCommitUrl: string;
}

interface Props extends FormItem {
  onEdit: (id: string) => void;
  onViewCommits: (formId: string) => void;
}

const FormInfoCard: FunctionComponent<Props> = ({
  id,
  name,
  status,
  isPublic,
  createdAt,
  closeDate,
  targetCommits,
  maxCommits,
  receivedCommits,
  statusBadgeColor,
  theme,
  targetGap,
  maxGap,
  progress,
  newCommitUrl,
  onEdit,
  onViewCommits,
}) => {
  const showProgress = targetGap > 0 || maxGap > 0;
  const isClosed = status.toLowerCase() !== Status.CLOSED;
  const onClickLink = () => window.open(newCommitUrl, '_blank');
  return (
    <section className="pwapp-form-card">
      <section className="pwapp-form-card__part">
        <div className="pwapp-form-card__part__side">
          <div className="pwapp-form-card__part__inner pwapp-form-card__face">
            <div className={
              classNames(
                'pwapp-form-card__face__colored-side',
                theme && `pwapp-form-card__face__colored-side--${theme}`,
              )}
            ></div>
            <div onClick={() => onEdit(id)}>
              <div className="pwapp-form-card__face__heading">
                <p className="pwapp-form-card__face__title">{name}</p>
                {createdAt}
                <Badge color={statusBadgeColor}>{status}</Badge>
                {
                  isPublic && <Badge color="primary">PUBLIC</Badge>
                }
              </div>
              <div className="pwapp-form-card__face__stats">
                <div className="pwapp-form-card__face__data">
                  <div className="pwapp-form-card__face__data-heading">
                    <Icons.Submit className="pwapp-form-card__face__icon"/>
                    Commits
                  </div>
                  <p>{receivedCommits}</p>
                </div>
                <div className="pwapp-form-card__face__data">
                  <div className="pwapp-form-card__face__data-heading">
                    <Icons.Target className="pwapp-form-card__face__icon"/>
                    Target
                  </div>
                  <p>{targetCommits}</p>
                </div>
                <div className="pwapp-form-card__face__data">
                  <div className="pwapp-form-card__face__data-heading">
                    <Icons.Dashboard className="pwapp-form-card__face__icon"/>
                    MAX
                  </div>
                  <p>{maxCommits}</p>
                </div>
                <div className="pwapp-form-card__face__data">
                  <div className="pwapp-form-card__face__data-heading">
                    <Icons.Timer className="pwapp-form-card__face__icon"/>
                    Close date
                  </div>
                  <p>{closeDate}</p>
                </div>
              </div>
            </div>
            <div className="pwapp-form-card__buttons">
              <Tooltip placement="top" content="Open form viewer">
                <IconButton onClick={onClickLink}><Icons.Link/></IconButton>
              </Tooltip>
              <Tooltip placement="top" content={
                <QRCode url={newCommitUrl}/>
              }>
                <IconButton><Icons.QRCode/></IconButton>
              </Tooltip>
              <Tooltip placement="top" content="Commits">
                <IconButton onClick={() => onViewCommits(id)}><Icons.Commit/></IconButton>
              </Tooltip>
              {
                isClosed && (
                  <Tooltip placement="top" content="Close from">
                    <IconButton><Icons.Archive/></IconButton>
                  </Tooltip>
                )
              }
            </div>
          </div>
        </div>
      </section>
      {
        showProgress && (
          <ProgressChart targetGap={targetGap} progress={progress} maxGap={maxGap} receivedCommits={receivedCommits}/>
        )
      }
    </section>
  );
};

export default FormInfoCard;
