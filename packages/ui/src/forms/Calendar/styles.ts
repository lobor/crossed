/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { inlineStyle } from '@crossed/styled';

export const widthCell = inlineStyle(() => ({
  base: { width: 40 },
  media: { md: { width: 50 } },
}));
