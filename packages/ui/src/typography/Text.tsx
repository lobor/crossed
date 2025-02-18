/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';

import {
  Text as TextNative,
  type TextProps as TextNativeProps,
} from 'react-native';
import {
  composeStyles,
  createStyles,
  CrossedMethods,
  withReactive,
} from '@crossed/styled';
import {
  fontWeightStyles,
  fontSizeStyles,
  fontColorStyles,
  PaymiumTypographyStyles,
} from '../styles/typography';
import { textAlignStyles } from '../styles/textAlign';
import { memo } from 'react';

const useText = createStyles(({ font }) => ({
  root: {
    base: Object.assign(font.extraStyles, {
      color: font.color,
      fontFamily: font.family,
    }),
  },
}));

export interface TextProps extends Omit<TextNativeProps, 'style'> {
  /**
   * Color of text
   */
  color?: keyof typeof fontColorStyles;

  /**
   * Extends style
   */
  style?: CrossedMethods<any>;

  /**
   * Select font-weight
   */
  weight?: keyof typeof fontWeightStyles;

  /**
   * select font-size
   */
  size?: keyof typeof fontSizeStyles;

  /**
   * select text-align
   */
  textAlign?: keyof typeof textAlignStyles;

  /**
   * Element ref
   */
  ref?: React.Ref<TextNative> | undefined;

  /**
   * select weight of 600
   */
  semiBold?: boolean;

  /**
   * select a variant
   */
  variant?: keyof typeof PaymiumTypographyStyles;
}

const Text = memo<TextProps>(
  withReactive(
    ({
      weight = 'md',
      color = 'primary',
      textAlign,
      size = 'md',
      style,
      variant = 'standard',
      semiBold = false,
      ...props
    }) => {
      return (
        <TextNative
          ref={props.ref}
          {...props}
          {...composeStyles(
            textAlignStyles[textAlign],
            fontSizeStyles[size],
            fontWeightStyles[weight],
            useText.root,
            fontColorStyles[color],
            variant && PaymiumTypographyStyles[variant],
            semiBold && fontWeightStyles.lg,
            style
          ).rnw()}
        />
      );
    }
  )
);
Text.displayName = 'Text';

export { Text };
