import React, { useContext, useState } from 'react';
import type { FC } from 'react';
import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme, Input, Button, Text } from '@rneui/themed';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import usePhoneNumber from '@hooks/use-phone-number';
import useDeviceId from '@hooks/use-device-id';
import { AppScreens } from '@enums/app-screens.enum';
import SignUpModal from '@components/sign-up-modal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@libs/store';
import { signinQuest } from '../store/auth.actions';
import { isSessionPendingSelector } from '../store/auth.selectors';
import { NavigationContext } from '@react-navigation/native';


const LoginScreen: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useTheme();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [deviceId, setDeviceId] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const navigation = useContext(NavigationContext);

  const pending_session = useSelector(isSessionPendingSelector);

  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);
  const handleSignUpPress = () => handleOpenModal();
  const handleChangePhoneNumber = (number: string) => setPhoneNumber(number);
  const handleChangeDeviceId = (id: string) => setDeviceId(id);
  const handleNavigateOtp = async () => {
    const signInData = {
      tel: phoneNumber,
      device_id: deviceId
    };
    const { payload } = await dispatch(signinQuest(signInData));
    if (payload instanceof Error) { return; }
    if (!payload) { return; }

    navigation?.navigate(AppScreens.Auth_Signin_QuestComplete, { device_id: deviceId, tel: phoneNumber });
  };

  usePhoneNumber(tel => handleChangePhoneNumber(tel));
  useDeviceId(id => handleChangeDeviceId(id));

  return (
    <ImageBackground source={require('../../../../assets/images/background.webp')} resizeMode="cover" style={styles.backgroundImage}>
      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} style={[{ ...styles.container }]}>
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image style={{ width: 177.03, height: 30.21 }} source={require('../../../../assets/images/Logo.png')} />
          </View>
          <Text h1>Start Saving Money</Text>
          <Text h2 style={{ marginBottom: 48 }}>Sign Up For Today</Text>
         
          <Input
            disabled={pending_session}
            keyboardType={"phone-pad"}
            label="Your Phone Number*"
            placeholder='+1555393345212'
            value={phoneNumber}
            onChangeText={handleChangePhoneNumber}
          />
        </View>
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginBottom: 14 }}>
          <Text t5 style={{ lineHeight: 22 }}>Don’t have an account?</Text>
          <TouchableOpacity onPress={handleSignUpPress}>
            <Text t6 style={{ color: theme.colors.purpleOptional, textDecorationLine: 'underline', fontWeight: '700' }}>
              &nbsp;Sign Up!
            </Text>
          </TouchableOpacity>
        </View>
        <Button color={"secondary"} variant={'main'}
          disabled={pending_session}
          onPress={handleNavigateOtp}>Login</Button>ёё
      </KeyboardAwareScrollView>
      <SignUpModal
        hasLogIn={false}
        isModalVisible={isModalVisible}
        handleCloseModal={handleCloseModal} />
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    paddingTop: 60,
    paddingBottom: 10,
    paddingHorizontal: 20
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 27.8
  },
  contentContainer: {
    flexGrow: 1,
  },
});
