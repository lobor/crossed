import { createScope } from '@crossed/core';

export type ContextSheet = {
  open: boolean;
  setOpen: (_value: boolean) => void;
  id: string;
};
export const [Provider, useContext] = createScope<ContextSheet>(
  {} as ContextSheet
);
