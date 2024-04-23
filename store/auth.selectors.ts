import { RootState } from "@libs/store";


export const sessionSelector = (state: RootState) => state.auth.session;
export const didSelector = (state: RootState) => state.auth.device_id;
export const sessionErrorSelector = (state: RootState) => state.auth.error.session;
export const isSessionPendingSelector = (state: RootState) => state.auth.pending.session;
