// services/api.ts

export const BASE_URL = "https://gxmtamcpjl.execute-api.us-east-1.amazonaws.com/dev";

export const API = {
  verifyOTP: `${BASE_URL}/auth/verify-otp`,
  saveHoroscope: `${BASE_URL}/auth/save-horoscope`,
  saveProfileSetup: `${BASE_URL}/auth/save-profile-setup`,
  checkUsername: `${BASE_URL}/auth/check-username`,
  suggestUsernames: `${BASE_URL}/auth/suggest-usernames`,
  editUsername: `${BASE_URL}/auth/edit-username`,
  directLogin: `${BASE_URL}/auth/direct-login`,
  profileInfo: `${BASE_URL}/user/profile`,
  logOut: `${BASE_URL}/auth/logout`,
};
