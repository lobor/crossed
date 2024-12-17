/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { CrossedPropsExtended } from '../types';
import { isWeb } from '../isWeb';
import { cache } from './cache';
import { apply } from './apply';
import { cleanClassName } from './cleanClassName';

export const rnw =
  ({
    styleOfKey,
    stylesParent,
  }: {
    styleOfKey: Record<string, any> | (() => unknown);
    stylesParent: Record<string, any>;
  }) =>
  (props: CrossedPropsExtended = {}) => {
    const old = cache.get({ style: styleOfKey, props, stylesParent });
    if (old) {
      return old;
    }
    let finalStyle = (isWeb ? { $$css: true } : {}) as any;
    apply(styleOfKey, props, ({ body }) => {
      if (isWeb) {
        Object.entries(body).forEach(([className, style]) => {
          const [nameStyle] = Object.keys(style);
          finalStyle[nameStyle] = finalStyle[nameStyle]
            ? `${finalStyle[nameStyle]} ${className}`
            : className;

          finalStyle[nameStyle] = Array.from(
            cleanClassName(finalStyle[nameStyle].split(' ')).values()
          ).join(' ');
        });
      } else {
        finalStyle = Object.values(body).reduce(
          (acc, curr) => ({ ...acc, ...curr }),
          finalStyle
        );
      }
    });
    let styletmp: object | undefined;
    (Array.isArray(props.style) ? props.style : [props.style])
      .flat(Infinity)
      .forEach((st) => {
        if (!st) return;
        if (!(st as any).$$css) {
          styletmp = { ...styletmp, ...st };
        }
      });
    const result = {
      style: styletmp
        ? [finalStyle, styletmp, stylesParent]
        : [finalStyle, stylesParent],
    };
    cache.set({ style: styleOfKey, props, stylesParent }, result);
    return result;
  };
