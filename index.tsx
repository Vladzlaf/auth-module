import React from 'react';
import type { FC } from 'react';

// ========= routes ===================
import SigninQuest from './signin-quest';
import SignupQuest from './signup-quest';

import { AppScreens } from '@enums/app-screens.enum';
import { AppStack } from '@root/app.routes';


const AuthRoutes: FC = () => (
  <AppStack.Navigator screenOptions={{ headerShown: false, }}>
    <AppStack.Group screenOptions={{ presentation: 'transparentModal', animation: 'fade' }}>
      <AppStack.Screen name={AppScreens.Auth_Signin} component={SigninQuest} />
      <AppStack.Screen name={AppScreens.Auth_Signup} component={SignupQuest} />
    </AppStack.Group>
  </AppStack.Navigator>
);

export default AuthRoutes;
