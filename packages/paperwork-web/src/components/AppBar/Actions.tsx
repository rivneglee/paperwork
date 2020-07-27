import React  from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icons, IconButton, Balloon } from '@paperwork/ui-widgets';

import { StoreState } from '../../store';
import { getUnreadNotifications } from '../../store/selectors';

interface Props {
  unread: number;
}

const mapStateToProps = (state: StoreState) => ({
  unread: getUnreadNotifications(state),
});

const Actions = ({ unread }: Props) => (
  <div>
    <Balloon content={unread}>
      <Link to="/notifications">
        <IconButton>
          <Icons.Message/>
        </IconButton>
      </Link>
    </Balloon>
  </div>
);

export default connect(mapStateToProps)(Actions);
