import * as Location from 'expo-location';

export const getLocationLabel = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') throw new Error('Permission denied');

  const location = await Location.getCurrentPositionAsync({});
  const [place] = await Location.reverseGeocodeAsync(location.coords);

  return {
    state: place.region,
    city: place.city || place.subregion,
    area: place.subregion || "",
  };
};
