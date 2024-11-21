/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

import { useContext, useEffect } from 'react';
import { Text, type TextProps } from '../../typography/Text';
import { buttonContext } from './context';
import { composeStyles } from '@crossed/styled';
import {
  buttonErrorStyles,
  buttonPrimaryStyles,
  buttonSecondaryStyles,
  buttonSuccessStyles,
  buttonTertiaryStyles,
  textStyles,
} from './styles';
type ButtonTextProps = TextProps;

const ButtonText = (props: ButtonTextProps) => {
  const { variant, state, disabled, size, setTextId, textId } =
    useContext(buttonContext);

  const { hover, active } = state;

  useEffect(() => {
    if (props.id && textId !== props.id) {
      setTextId(props.id);
    }
  }, [props.id, textId, setTextId]);

  return (
    <Text
      weight={size || undefined}
      size={size || undefined}
      {...props}
      id={textId}
      style={composeStyles(
        textStyles.default,
        variant === 'primary' && buttonPrimaryStyles.text,
        variant === 'primary' && hover && buttonPrimaryStyles.textHover,
        variant === 'primary' && active && buttonPrimaryStyles.textActive,
        variant === 'secondary' && buttonSecondaryStyles.text,
        variant === 'secondary' && hover && buttonSecondaryStyles.textHover,
        variant === 'secondary' && active && buttonSecondaryStyles.text,
        variant === 'tertiary' && buttonTertiaryStyles.textActive,
        variant === 'tertiary' && hover && buttonTertiaryStyles.textHover,
        variant === 'tertiary' && active && buttonTertiaryStyles.textActive,
        variant === 'error' && buttonErrorStyles.text,
        variant === 'success' && buttonSuccessStyles.text,
        disabled && textStyles.disabled,
        props.style
      )}
      ref={props.ref}
    />
  );
};
ButtonText.displayName = 'Button.Text';

export { ButtonText, type ButtonTextProps };
