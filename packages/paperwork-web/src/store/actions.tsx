export const SET_ACTIVE_MENU_ID = 'SET_ACTIVE_MENU_ID';

export interface SetActiveMenuAction {
  menuId: string;
  type: string;
}

export const createSetActiveMenuAction = (menuId: string): SetActiveMenuAction => ({
  menuId,
  type: SET_ACTIVE_MENU_ID,
});
