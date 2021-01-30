import { connect } from 'react-redux';

import { StoreState } from '../../store';
import { getAuthentication } from '../../store/selectors';
import Selector from './OrganisationSelector';
import Modal from './OrganisationModal';

const mapStateToProps = (state: StoreState) => {
  const { user } = getAuthentication(state) || {};
  return ({
    organisation: user,
  });
};

export const OrganisationSelector = connect(mapStateToProps)(Selector);
export const OrganisationModal = connect(mapStateToProps)(Modal);
