import { SHOW_DIALOG, CLOSE_DIALOG, CONFIRM_DIALOG } from "./constants";

export const openDialog = (title, content, type) => ({
  type: SHOW_DIALOG,
  payload: { title, content, type }
});

export const closeDialog = () => ({ type: CLOSE_DIALOG });
export const confirmDialog = () => ({ type: CONFIRM_DIALOG });
