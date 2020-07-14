import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { Badge, Icons } from '@paperwork/ui-widgets';

import './FormInfoCard.scss';
import ProgressChart from './ProgressChart';

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
}

const FormInfoCard: FunctionComponent<FormItem> = ({
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
}) => {
  const showProgress = targetGap > 0 || maxGap > 0;
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
