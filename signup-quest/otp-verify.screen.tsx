import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
} from 'react-native';
import {
  useTheme,
  Text,
} from '@rneui/themed';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import OTPField from '@components/otp-field';
import useOtpListener from '@hooks/use-otp-listener';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@libs/store';
import { signupQuestComplete } from '../store/auth.actions';
import { isSessionPendingSelector } from '../store/auth.selectors';


const OtpVerifyScreen: FC<any> = ({ route }) => {
  const { tel, device_id } = route.params;

  const dispatch = useDispatch<AppDispatch>();
  const [otpInput, setOtpInput] = useState<string>('');
  const { theme } = useTheme();

  const pending_session = useSelector(isSessionPendingSelector);

  useOtpListener(otp => {
    if (!otp) { return; }
    setOtpInput(otp);
  });

  const signInComplete = async () => {
    const signInCompleteData = {
      tel,
      otp: Number(otpInput),
      device_id
    };
    const { payload } = await dispatch(signupQuestComplete(signInCompleteData));
    if (payload instanceof Error) { return; }
    if (!payload) { return; }
  };

  useEffect(() => {
    if (otpInput?.length !== 6) { return; }
    signInComplete();
  }, [otpInput]);

  return (
    <ImageBackground source={require('../../../../assets/images/background.webp')} resizeMode="cover" style={styles.backgroundImage}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1 }}
        style={[
          {
            ...styles.container,
          },
        ]}
      >
        <View style={styles.contentContainer}>
          <Text h1 h1Style={{ textAlign: 'left' }}>Code Verification</Text>
          <Text h2 h2Style={{ marginBottom: 24, textAlign: 'left' }}>
            To ensure the security of your account and enhance your experience, we
            require a quick verification step.&nbsp;
          </Text>
          <Text h2 h2Style={{ marginBottom: 74, textAlign: 'left' }}>
            Please enter the verification code sent to your mobile number below.&nbsp;
          </Text>

          {!pending_session && (<OTPField defaultValue={otpInput} onInput={setOtpInput} />)}
          {pending_session && (<Text t3>Loading...</Text>)}

          <Text t3 style={{ fontSize: 16, lineHeight: 22, textDecorationLine: 'underline', color: theme.colors.white, textAlign: 'center' }}>Resend Code</Text>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    paddingTop: 60,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  contentContainer: {
    flexGrow: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    height: 260,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 20,
    paddingTop: 25,
  },
});

export default OtpVerifyScreen;


