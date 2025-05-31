import React from 'react'
import Svg, { Path } from 'react-native-svg'

type Props = {
  width?: number
  height?: number
  stroke?: string
}

export default function DiscoverIcon({ width = 31, height = 31, stroke = '#000' }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 31 31" fill="none">
      <Path
        d="M15.7785 1.36267C23.3724 1.36267 29.5285 7.51876 29.5285 15.1127C29.5285 22.7066 23.3724 28.8627 15.7785 28.8627C8.18459 28.8627 2.0285 22.7066 2.0285 15.1127C2.0285 7.51876 8.18459 1.36267 15.7785 1.36267Z"
        stroke={stroke}
        strokeWidth={2.5}
      />
      <Path
        d="M10.4809 20.6851C10.3018 20.7941 10.0971 20.5893 10.206 20.4103L13.6628 14.7314C14.094 14.023 14.6888 13.4282 15.3973 12.9969L21.0762 9.54019C21.2552 9.43122 21.46 9.636 21.351 9.81502L17.8942 15.4939C17.463 16.2024 16.8682 16.7972 16.1597 17.2284L10.4809 20.6851Z"
        stroke={stroke}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
