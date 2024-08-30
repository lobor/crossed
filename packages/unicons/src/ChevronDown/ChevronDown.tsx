/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useTheme } from '@crossed/styled';
import type { RequireOnly } from '../types';

export const ChevronDown = ({
  Svg,
  Path,
  color,
  size = 24,
  ...other
}: RequireOnly<'Path' | 'Svg'>) => {
  const theme = useTheme();
  return (
    <Svg
      {...other}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke={color ?? theme.font.color}
    >
      <Path d="m6 9 6 6 6-6" />
    </Svg>
  );
};
