
import { createSlice } from '@reduxjs/toolkit';
import {
  signinQuest, signinQuestComplete,
  signupQuest, signupQuestComplete,
  signout
} from './auth.actions';
import { StorageService } from '@libs/mobile-storage';
import 'react-native-get-random-values';
import { v4 } from 'uuid';

interface AuthState {
  session?: string;
  device_id?: string;
  pending: {
    session: boolean;
  };
  error: {
    session?: string;
  }
}

const key = StorageService.shared.get(StorageService.TOKEN_KEY);
const session = key ? key : undefined;

const initialState: AuthState = {
  session,
  pending: {
    session: false,
  },
  error: {
    session: undefined,
  }
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearSession: (state) => {
      state.session = undefined;
      state.pending.session = false;
      state.error.session = undefined;
    }
  },
  extraReducers: (builder) => {
    builder
      // quest
      .addCase(signinQuest.pending, (state) => {
        state.session = undefined;
        state.pending.session = true;
        state.error.session = undefined;
      })
      .addCase(signinQuest.fulfilled, (state) => {
        state.pending.session = false;
      })
      .addCase(signinQuest.rejected, (state, action) => {
        state.pending.session = false;
        state.error.session = action.error.message;
      })
      .addCase(signupQuest.pending, (state) => {
        state.session = undefined;
        state.pending.session = true;
        state.error.session = undefined;
      })
      .addCase(signupQuest.fulfilled, (state) => {
        state.pending.session = false;
      })
      .addCase(signupQuest.rejected, (state, action) => {
        state.pending.session = false;
        state.error.session = action.error.message;
      })
      // quest complete
      .addCase(signinQuestComplete.pending, (state) => {
        state.session = undefined;
        state.pending.session = true;
        state.error.session = undefined;
      })
      .addCase(signinQuestComplete.fulfilled, (state, action) => {
        state.session = action.payload;
        state.pending.session = false;
      })
      .addCase(signinQuestComplete.rejected, (state, action) => {
        state.pending.session = false;
        state.error.session = action.error.message;
      })
      .addCase(signupQuestComplete.pending, (state) => {
        state.session = undefined;
        state.pending.session = true;
        state.error.session = undefined;
      })
      .addCase(signupQuestComplete.fulfilled, (state, action) => {
        state.session = action.payload;
        state.pending.session = false;
      })
      .addCase(signupQuestComplete.rejected, (state, action) => {
        state.pending.session = false;
        state.error.session = action.error.message;
      })
      // signout
      .addCase(signout.pending, (state) => {
        state.pending.session = true;
        state.error.session = undefined;
      })
      .addCase(signout.fulfilled, (state) => {
        state.session = undefined;
        state.pending.session = false;
      })
      .addCase(signout.rejected, (state, action) => {
        state.pending.session = false;
        state.error.session = action.error.message;
      })
  },
});

export const { clearSession } = authSlice.actions;