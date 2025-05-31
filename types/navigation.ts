export type RootStackParamList = {
  Splash: undefined;
  Signup: undefined;
  Login: undefined;
  OtpVerification: { mobile: string; name: string; user_id: string };
  Horoscope: { userId: string; username: string; name: string };
  Profile: { userId: string; username: string; name: string };
  EditUsername: { currentUsername: string; userId: string; name: string };
  Main: undefined;
  HobbiesScreen: undefined;
  AddressScreen: undefined;
  FamilyDetailsScreen: undefined;
  OccupationScreen: undefined;
  EducationScreen: undefined;

  HappyJodi: undefined;
  JodiDetail: { jodiId: string };
};
