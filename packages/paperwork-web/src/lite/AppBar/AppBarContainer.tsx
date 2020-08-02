import { connect } from 'react-redux';

import { StoreState } from '../../store';
import { getAuthentication } from '../../store/selectors';
import { createSetActiveMenuAction } from '../../store/actions';

import AppBar from './AppBar';

const mapStateToProps = (state: StoreState) => ({
  authentication: getAuthentication(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  onMenuClick: (menuId: string) => dispatch(createSetActiveMenuAction(menuId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppBar);
