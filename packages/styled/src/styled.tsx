'use client';

import { forwardRef, useCallback, useEffect } from 'react';
import { Platform } from 'react-native';
import {
  withStaticProperties,
  composeEventHandlers,
  useUncontrolled,
} from '@crossed/core';
import { crossed } from './crossed';
import { merge } from './crossed/merge';
import type {
  NewComponentProps,
  PropsFromExtends,
  StylableComponent,
  StyledComponent,
  Config,
  ConfigSchemaUndefined,
  Props,
  StylesFunctionUndefined,
} from '@crossed/core';
import { twMerge } from 'tailwind-merge';
// import { StyleSheet } from './styleSheet';
import { useCrossedTheme } from './CrossedTheme';
import { default as tw } from 'twrnc';

export function styled<
  P extends Record<string, any>,
  E extends StylesFunctionUndefined<any> = undefined,
  T extends ConfigSchemaUndefined<P> = undefined
>(Component: StylableComponent<P>, themeConfig: Config<P, T, E>) {
  const { extends: extendsStyle, ...themeConfigProps } = themeConfig;
  const stylesClass = crossed<T, P>(themeConfigProps);

  const variantNames = Object.keys(
    themeConfigProps.variants || {}
  ) as (keyof T)[];

  const NewComponent = forwardRef<any, NewComponentProps<T, P, E>>(
    function CrossedStyledComponent(props, ref) {
      const { theme } = useCrossedTheme();

      const [active, setActive] = useUncontrolled({
        defaultValue: false,
        value: props.states?.isActive,
      });
      const [hover, setHover] = useUncontrolled({
        defaultValue: false,
        value: props.states?.isHover,
      });
      const [focus, setFocus] = useUncontrolled({
        defaultValue: false,
        value: props.states?.isFocus,
      });
      const { componentProps, variantProps } = Object.entries(props).reduce<{
        componentProps: P;
        variantProps: Props<T, P>;
      }>(
        (acc, [propsName, valueProps]) => {
          if (variantNames.includes(propsName as any)) {
            (acc.variantProps as any)[propsName as any] =
              valueProps || undefined;
          } else if (
            !['className', 'states', '$dark', '$light'].includes(propsName)
          ) {
            (acc.componentProps as any)[propsName] = valueProps;
          }
          return acc;
        },
        {
          componentProps: {},
          variantProps: themeConfigProps?.defaultVariants || {},
        } as any
      );
      const styles = stylesClass(variantProps);

      const NewComp = styles.props?.as ? styles.props?.as : Component;
      const asIsString = typeof NewComp === 'string';

      const extendClassName = extendsStyle?.(props as any) || {};

      const variantExtendClassName =
        (props.disabled
          ? extendClassName[':disabled']?.className
          : active
          ? extendClassName[':active']?.className
          : hover
          ? extendClassName[':hover']?.className
          : focus
          ? extendClassName[':focus']?.className
          : extendClassName.className) || extendClassName.className;

      const variantExtendThemeClassName =
        (props.disabled
          ? extendClassName[':disabled']?.[`:${theme}`]?.className
          : active
          ? extendClassName[':active']?.[`:${theme}`]?.className
          : hover
          ? extendClassName[':hover']?.[`:${theme}`]?.className
          : focus
          ? extendClassName[':focus']?.[`:${theme}`]?.className
          : extendClassName?.[`:${theme}`]?.className) ||
        extendClassName?.[`:${theme}`]?.className;

      const variantClassName =
        (props.disabled
          ? styles[':disabled']?.className
          : active
          ? styles[':active']?.className
          : hover
          ? styles[':hover']?.className
          : focus
          ? styles[':focus']?.className
          : styles.className) || styles.className;
      const variantThemeClassName =
        (props.disabled
          ? styles[':disabled']?.[`:${theme}`]?.className
          : active
          ? styles[':active']?.[`:${theme}`]?.className
          : hover
          ? styles[':hover']?.[`:${theme}`]?.className
          : focus
          ? styles[':focus']?.[`:${theme}`]?.className
          : styles?.[`:${theme}`]?.className) ||
        styles?.[`:${theme}`]?.className;

      // TODO: remove as any
      const propsVariant = {
        ...styles.props,
        ...(theme === 'dark' ? props.$dark?.props : props.$light?.props),
        ...(props.disabled
          ? styles[':disabled']?.props
          : active
          ? styles[':active']?.props
          : hover
          ? styles[':hover']?.props
          : focus
          ? styles[':focus']?.props
          : styles.props),
        style: {
          ...((styles.props || {}) as any).style,
          ...(theme === 'dark'
            ? (props.$dark?.props || {}).style
            : (props.$light?.props || {}).style),
          ...(props.disabled
            ? ((styles[':disabled']?.props || {}) as any).style
            : active
            ? ((styles[':active']?.props || {}) as any).style
            : hover
            ? ((styles[':hover']?.props || {}) as any).style
            : focus
            ? ((styles[':focus']?.props || {}) as any).style
            : ((styles.props || {}) as any).style),
        },
      };

      const baseClassName = twMerge(
        extendClassName?.className,
        extendClassName?.[`:${theme}`]?.className,
        variantExtendClassName,
        variantExtendThemeClassName,
        styles.className,
        styles?.[`:${theme}`]?.className,
        variantClassName,
        variantThemeClassName,
        props.className,
        theme === 'dark' ? props.$dark?.className : props.$light?.className
      );

      // const key = Platform.OS === 'web' ? 'className' : 'style';

      const styleProps = {
        className: baseClassName,
      };

      const toto = useCallback(() => {
        setActive(false);
      }, []);

      useEffect(() => {
        if (Platform.OS === 'web' && !hover && active) {
          window.document.body.addEventListener('mouseup', toto);
          return () => {
            window.document.body.removeEventListener('mouseup', toto);
          };
        }
        return () => {};
      }, [hover, active]);

      const propsComponent = {
        ...(componentProps as any),
        ...propsVariant,
      };

      return (
        <NewComp
          ref={ref}
          {...parsedPropsProperty(propsComponent)}
          {...(asIsString
            ? {
                'data-class-name': styleProps.className,
              }
            : {
                dataSet: {
                  ...propsComponent.dataSet,
                  className: styleProps.className,
                },
              })}
          style={
            asIsString
              ? {
                  // ...(styleProps.style as any),
                  ...propsComponent.style,
                  ...componentProps.style,
                }
              : [
                  // styleProps.style,
                  ...(Array.isArray(propsComponent.style)
                    ? propsComponent.style
                    : [propsComponent.style]),
                  componentProps.style,
                ]
          }
          onMouseDown={composeEventHandlers(componentProps?.onMouseDown, () => {
            setActive(true);
          })}
          onMouseUp={composeEventHandlers(componentProps?.onMouseUp, () => {
            setActive(false);
          })}
          onMouseEnter={composeEventHandlers(() => {
            setHover(true);
          }, componentProps?.onMouseEnter)}
          onMouseLeave={composeEventHandlers(() => {
            setHover(false);
          }, componentProps?.onMouseLeave)}
          onPressIn={composeEventHandlers(componentProps?.onPressIn, () => {
            setActive(true);
          })}
          onPressOut={composeEventHandlers(componentProps?.onPressOut, () => {
            setActive(false);
          })}
          onHoverIn={composeEventHandlers(() => {
            setHover(true);
          }, componentProps?.onHoverIn)}
          onHoverOut={composeEventHandlers(() => {
            setHover(false);
          }, componentProps?.onHoverOut)}
          onBlur={composeEventHandlers(componentProps?.onBlur, () => {
            setFocus(false);
          })}
          onFocus={composeEventHandlers(componentProps?.onFocus, () => {
            setFocus(true);
          })}
        />
      );
    }
  );

  return withStaticProperties(NewComponent, {
    styles: (p?: Props<T, P> & PropsFromExtends<E>) => {
      const parentStyle = (Component as any).styles?.(p);
      const style = stylesClass(p);
      return parentStyle ? merge(parentStyle, style) : style;
    },
  }) as unknown as StyledComponent<T, P, E>;
}

const parsedPropsProperty = (props: Record<string, unknown>) => {
  return Object.entries(props).reduce<Record<string, unknown>>(
    (acc, [key, value]) => {
      if (typeof value === 'string' && value.startsWith('$')) {
        acc[key] = tw.color(value.replace('$', ''));
      } else {
        acc[key] = value;
      }
      return acc;
    },
    {}
  );
};
