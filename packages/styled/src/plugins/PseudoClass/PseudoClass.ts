/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import type { CrossedstyleValues, Plugin } from '../../types';
import { convertKeyToCss, normalizeUnitPixel } from './../utils';

export interface CrossedPseudoClassProps {
  focus?: true | false;
  hover?: true | false;
  active?: true | false;
}

export interface CrossedPseudoClassPlugin {
  ':focus'?: CrossedstyleValues;
  ':hover'?: CrossedstyleValues;
  ':active'?: CrossedstyleValues;
}

export const PseudoClassPlugin: Plugin<CrossedPseudoClassPlugin> = {
  name: 'PseudoClassPlugin',
  test: '^:(hover|active|focus)$',
  apply: ({ styles, key: ctxKey, addClassname, props, isWeb }) => {
    const pseudoClass = ctxKey.replace(/:/i, '');
    Object.entries(styles).forEach(([key, value]) => {
      const valueNormalized = normalizeUnitPixel(key, value, isWeb);
      if (isWeb) {
        addClassname({
          suffix: `:${pseudoClass}`,
          body: {
            [`${pseudoClass}:${convertKeyToCss(key)}-[${valueNormalized}]`]: {
              [key]: valueNormalized,
            },
          },
        });
      }
      if (props?.[pseudoClass] || !props) {
        addClassname({
          body: {
            [`${convertKeyToCss(key)}-[${valueNormalized}]`]: {
              [key]: valueNormalized,
            },
          },
        });
      }
    }, {});
  },
};
