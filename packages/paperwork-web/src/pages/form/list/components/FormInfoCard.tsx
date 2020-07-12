import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { Badge } from '@paperwork/ui-widgets';

import './FormInfoCard.scss';

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
  theme?: string;
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
}) => (
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
              Commits
              <p>{receivedCommits}</p>
            </div>
            <div className="pwapp-form-card__face__data">
              Target
              <p>{targetCommits}</p>
            </div>
            <div className="pwapp-form-card__face__data">
              MAX
              <p>{maxCommits}</p>
            </div>
            <div className="pwapp-form-card__face__data">
              Close date
              <p>{closeDate}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
);

export default FormInfoCard;
