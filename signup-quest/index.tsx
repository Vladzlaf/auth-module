import React from 'react';
import type { FC } from 'react';

import { AppScreens } from '@enums/app-screens.enum';
import OtpVerifyScreen from './otp-verify.screen';
import { AppStack } from '@root/app.routes';


const SigninQuest: FC = () => {

  return (
    <>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name={AppScreens.Auth_Signup_QuestComplete} component={OtpVerifyScreen} />
      </AppStack.Navigator>
    </>
  );
};

export default SigninQuest;
