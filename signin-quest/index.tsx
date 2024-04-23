import React from 'react';
import type { FC } from 'react';

import { AppScreens } from '@enums/app-screens.enum';

import SigninScreen from './main.screen';
import OtpVerifyScreen from './otp-verify.screen';
import { AppStack } from '@root/app.routes';


const SigninQuest: FC = () => {

  return (
    <>
      <AppStack.Navigator screenOptions={{ headerShown: false, presentation: 'transparentModal', animation: 'fade' }}>
        <AppStack.Screen name={AppScreens.Auth_Signin_Quest} component={SigninScreen} />
        <AppStack.Screen name={AppScreens.Auth_Signin_QuestComplete} component={OtpVerifyScreen} />
      </AppStack.Navigator>
    </>
  );
};

export default SigninQuest;
