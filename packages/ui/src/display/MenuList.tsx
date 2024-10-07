/**
 * Copyright (c) Paymium.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root of this projects source tree.
 */

'use client';
import {
  composeStyles,
  createStyles,
  CrossedMethods,
  withReactive,
  // type ExtractForProps,
} from '@crossed/styled';
import { Text, TextProps } from '../typography/Text';
import { YBox, type YBoxProps } from '../layout/YBox';
import { Divider as D, DividerProps } from '../layout/Divider';
import { withStaticProperties } from '@crossed/core';
import { cloneElement, forwardRef, isValidElement, useCallback } from 'react';
import { Pressable, View, type PressableProps } from 'react-native';

const rootStyle = createStyles(({ colors, space }) => ({
  default: {
    base: {
      alignItems: 'stretch',
      backgroundColor: colors.background.secondary,
      gap: space.xxs,
    },
  },
  border: {
    base: {
      borderWidth: 1,
      borderColor: colors.border.primary,
      borderRadius: 8,
    },
  },
  padded: { base: { padding: space.xxs } },
}));
const itemStyles = createStyles((t) => ({
  item: {
    'base': {
      display: 'flex',
      flexDirection: 'column',
      // alignItems: 'center',
      paddingHorizontal: t.space.xs,
      justifyContent: 'center',
      // height: 42,
      paddingTop: t.space.xxs,
      paddingBottom: t.space.xxs,
      paddingLeft: t.space.xs,
      paddingRight: t.space.xs,
      borderWidth: 0,
      borderRadius: 5,
    },
    ':hover': {
      backgroundColor: t.colors.background.hover,
    },
    ':active': {
      backgroundColor: t.colors.background.active,
    },
    'web': {
      ':focus-visible': {
        outlineColor: t.colors.border.brand,
      },
    },
  },
}));

const MenuRoot = forwardRef<View, MenuRootProps>(
  ({ padded = true, bordered = true, ...props }: MenuRootProps, ref: any) => {
    return (
      <YBox
        role="list"
        {...props}
        style={composeStyles(
          rootStyle.default,
          bordered && rootStyle.border,
          padded && rootStyle.padded,
          props.style
        )}
        ref={ref}
      />
    );
  }
);
MenuRoot.displayName = 'MenuList';

type MenuRootProps = YBoxProps & {
  /**
   * Apply padding
   */
  padded?: boolean;
  /**
   * Apply border
   */
  bordered?: boolean;
};

const MenuDivider = (props: DividerProps) => <D {...props} />;
MenuDivider.displayName = 'MenuList.Divider';

export type MenuListItemProps = Omit<PressableProps, 'style'> & {
  asChild?: boolean;
  style?: CrossedMethods<any>;
};
const MenuItem = withReactive<MenuListItemProps>(
  forwardRef<View, MenuListItemProps>(
    ({ asChild, style, children, ...props }: MenuListItemProps, ref) => {
      const styleCallback = useCallback(
        ({ pressed }) =>
          composeStyles(itemStyles.item, style).rnw({ active: pressed }).style,
        [style]
      );
      return asChild && isValidElement(children) ? (
        cloneElement(children, {
          style: styleCallback,
          role: 'listitem',
        } as any)
      ) : (
        <Pressable role="listitem" {...props} style={styleCallback} ref={ref}>
          {children}
        </Pressable>
      );
    }
  )
);
MenuItem.displayName = 'MenuList.Item';

const MenuLabel = Text;
const MenuTitle = (props: TextProps) => <Text color="secondary" {...props} />;

const MenuList = withStaticProperties(MenuRoot, {
  Divider: MenuDivider,
  Item: MenuItem,
  Label: MenuLabel,
  Title: MenuTitle,
});
MenuList.displayName = 'MenuList';

export { MenuList, MenuDivider, MenuItem, MenuLabel, MenuTitle };
