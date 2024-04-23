import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "@libs/client";

import { SigninQuestForm } from "../domain/signin-quest.form";
import { SigninQuestCompleteForm } from "../domain/signin-quest-complete.form";
import { SignupQuestForm } from "../domain/signup-quest.form";
import { SignupQuestCompleteForm } from "../domain/signup-quest-complete.form";
import { StorageService } from "@libs/mobile-storage";
import { clearProfile } from "@app/profile/store/profile.slice";
import { clearSession } from "./auth.slice";
import { clearOnboarding } from "@app/onboarding/store/onboarding.slice";
import { clearMethod } from "@app/onboarding/store/method.slice";
import { clearFuse } from "@app/onboarding/store/fuse.slice";


export const signinQuest = createAsyncThunk('auth/signin-quest', async (form: SigninQuestForm, { rejectWithValue }) => {
  try {
    const response = await client.post<boolean>('/auth/signin-quest', form);
    return response.data;
  }
  catch (error) {
    console.error(error);
    rejectWithValue(error);
  }
});

export const signinQuestComplete = createAsyncThunk('auth/signin-quest-complete', async (form: SigninQuestCompleteForm, { rejectWithValue }) => {
  try {
    const response = await client.post<string>('/auth/signin-quest-complete', form);
    StorageService.shared.set(StorageService.TOKEN_KEY, response.data);
    return response.data;
  }
  catch (error) {
    console.error(error);
    rejectWithValue(error);
  }
});

export const signupQuest = createAsyncThunk('auth/signup-quest', async (form: SignupQuestForm, { rejectWithValue }) => {
  try {
    const response = await client.post<boolean>('/auth/signup-quest', form);
    return response.data;
  }
  catch (error) {
    console.error(error);
    rejectWithValue(error);
  }
});

export const signupQuestComplete = createAsyncThunk('auth/signup-quest-complete', async (form: SignupQuestCompleteForm, { rejectWithValue }) => {
  try {
    const response = await client.post<string>('/auth/signup-quest-complete', form);
    StorageService.shared.set(StorageService.TOKEN_KEY, response.data);
    return response.data;
  }
  catch (error) {
    console.error(error);
    rejectWithValue(error);
  }
});

export const signout = createAsyncThunk('auth/signout', async (payload: boolean, { rejectWithValue, dispatch }) => {
  try {
    if (payload) {
      StorageService.shared.removeKey(StorageService.TOKEN_KEY);
      await dispatch(clearProfile());
      await dispatch(clearSession());
      await dispatch(clearOnboarding());
      await dispatch(clearMethod());
      await dispatch(clearFuse());
      return true;
    }

    const device_id = StorageService.shared.get(StorageService.DID_KEY) as string;
    const response = await client.post<boolean>('/auth/signout', { device_id });
    if (!response.data) { return false; }

    StorageService.shared.removeKey(StorageService.TOKEN_KEY);
    await dispatch(clearProfile());
    await dispatch(clearSession());
    await dispatch(clearOnboarding());
    await dispatch(clearMethod());
    await dispatch(clearFuse());
    return response.data;
  }
  catch (error) {
    console.error(error);
    rejectWithValue(error);
  }
});
