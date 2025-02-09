/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { withStaticProperties } from '@crossed/core';
import { SwitchTrack } from './Track';
import { SwitchLabel } from './Label';
import { SwitchPreset } from './Preset';
import { Root } from './Root';

export const Switch = withStaticProperties(Root, {
  Thumb: SwitchTrack,
  Label: SwitchLabel,
  Preset: SwitchPreset,
});

export { SwitchLabel, SwitchTrack, SwitchPreset };
