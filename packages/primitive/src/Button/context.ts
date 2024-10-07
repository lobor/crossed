/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { createScope } from '@crossed/core';

export type ContextButton = {
  id: string;
};

export const [Provider, useContext] = createScope<ContextButton>(
  {} as ContextButton
);

type ButtonGroupContext = {
  orientation: 'horizontal' | 'vertical';
  grouped?: boolean;
};
export const [ProviderGroup, useContextGroup] = createScope<ButtonGroupContext>(
  { orientation: 'horizontal' } as ButtonGroupContext
);
