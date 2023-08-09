import { createContext, useContext as useContextReact, useMemo } from 'react';

export const createScope = <C extends object | null>(defaultContext: C) => {
  const Context = createContext<C>(defaultContext);

  function Provider(props: C & { children: React.ReactNode }) {
    const { children, ...context } = props;
    // Only re-memoize when prop values change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const value = useMemo(() => context, Object.values(context)) as C;
    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  function useContext(): C {
    return useContextReact(Context);
  }

  return [Provider, useContext] as const;
};
