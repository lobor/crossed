/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { Colors } from './color';
import type { Components } from './components';
import type { Font } from './font';
import type { Spaces } from './space';

export type Theme = {
  boxShadow: string;
  colors: Colors;
  space: Spaces;
  font: Font;
  components?: Components;
};
