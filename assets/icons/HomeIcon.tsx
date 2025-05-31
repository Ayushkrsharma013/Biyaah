import React from 'react'
import Svg, { Path } from 'react-native-svg'

type Props = {
  width?: number
  height?: number
  stroke?: string
}

export default function HomeIcon({ width = 30, height = 30, stroke = '#000' }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 30 31" fill="none">
      <Path
        d="M2.95508 16.31C2.48078 13.0136 2.24363 11.3655 2.91921 9.95633C3.59478 8.54714 5.03273 7.69057 7.90863 5.9774L9.63968 4.94623C12.2513 3.3905 13.5571 2.61264 15 2.61264C16.4429 2.61264 17.7487 3.3905 20.3602 4.94623L22.0914 5.9774C24.9672 7.69057 26.4052 8.54714 27.0807 9.95633C27.7564 11.3655 27.5192 13.0136 27.0449 16.31L26.6965 18.7316C26.0871 22.966 25.7825 25.0831 24.3137 26.3479C22.8449 27.6126 20.6907 27.6126 16.3826 27.6126H13.6174C9.30921 27.6126 7.15511 27.6126 5.68628 26.3479C4.21745 25.0831 3.91281 22.966 3.30355 18.7316L2.95508 16.31Z"
        stroke={stroke}
        strokeWidth={2.5}
      />
      <Path
        d="M15 18.8627V22.6127"
        stroke={stroke}
        strokeWidth={3.75}
        strokeLinecap="round"
      />
    </Svg>
  )
}
