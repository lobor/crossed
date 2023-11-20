import type { ComponentType } from 'react';
import { withStaticProperties } from '@crossed/core';
import { createListMain } from './List';
import { createListItem } from './ListItem';
import { createListTitle } from './ListTitle';
import { createListSubTitle } from './ListSubTitle';

export const createList = <
  ListProps extends Record<string, any>,
  ItemProps extends Record<string, any>,
  TitleProps extends Record<string, any>,
  SubTitleProps extends Record<string, any>,
  LabelProps extends Record<string, any>,
  DividerProps extends Record<string, any>
>(components: {
  Root: ComponentType<ListProps>;
  Item: ComponentType<ItemProps>;
  Title: ComponentType<TitleProps>;
  SubTitle: ComponentType<SubTitleProps>;
  Label: ComponentType<LabelProps>;
  Divider: ComponentType<DividerProps>;
}) => {
  const { Root, Item, Title, SubTitle, Label, Divider } = components;
  const List = createListMain(Root);
  const ListItem = createListItem(Item);
  const ListTitle = createListTitle(Title);
  const ListSubTitle = createListSubTitle(SubTitle);
  const ListLabel = createListSubTitle(Label);
  const ListDivider = createListSubTitle(Divider);

  List.displayName = 'List';
  ListItem.displayName = 'List.Item';
  ListTitle.displayName = 'List.Title';
  ListSubTitle.displayName = 'List.SubTitle';
  ListLabel.displayName = 'List.Label';
  ListDivider.displayName = 'List.Divider';

  return withStaticProperties(List, {
    Item: ListItem,
    Title: ListTitle,
    SubTitle: ListSubTitle,
    Label: ListLabel,
    Divider: ListDivider,
  });
};
