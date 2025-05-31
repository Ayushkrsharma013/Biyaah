import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { ViewStyle, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

interface Props {
  onPress: () => void;
  style?: ViewStyle;
}

const EditIcon: React.FC<Props> = ({ onPress, style }) => {
  return (
    <Animatable.View
      animation="pulse"
      iterationCount="infinite"
      duration={2000}
    >
      <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={style}>
        <Svg
          width={20}
          height={20}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#701111"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <Path d="M12 20h9" />
          <Path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
        </Svg>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default EditIcon;
