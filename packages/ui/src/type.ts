/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type {
  CrossedBasePlugin,
  CrossedMediaQueriesPlugin,
  CrossedPseudoClassPlugin,
  CrossedThemePlugin,
  CrossedVariantsPlugin,
} from '@crossed/styled/plugins';
import { darkTheme, lightTheme } from './theme/theme';
import type { breakpoints } from './theme/breakpoints';
import type { CrossedVariantsPluginProps } from '@crossed/styled/src/plugins/Variants';
import type { CrossedPseudoClassProps } from '@crossed/styled/src/plugins/PseudoClass';

const themes = { dark: darkTheme, light: lightTheme };
type ThemesCustom = typeof themes;
type Breakpoints = keyof typeof breakpoints;

declare module '@crossed/styled' {
  // export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface StyleSheet
    extends CrossedBasePlugin,
      CrossedVariantsPlugin,
      CrossedThemePlugin,
      CrossedMediaQueriesPlugin<Breakpoints>,
      CrossedPseudoClassPlugin {}

  export interface CrossedPropsExtended<S extends StyleSheet>
    extends CrossedVariantsPluginProps<
      S['theme'] extends (..._args: any) => any
        ? ReturnType<S['theme']>['variants'] &
            S['variants'] &
            CrossedPseudoClassProps
        : S['variants'] & CrossedPseudoClassProps
    > {}
}

declare module '@crossed/styled/plugins' {
  export interface Themes extends ThemesCustom {}
}
