import { Select } from '@crossed/ui';
import type { Props } from '../../props';

export const SelectDemo = ({ size, variant, color }: Props) => {
  return (
    <Select size={size} variant={variant as any} color={color}>
      <Select.Label>Size</Select.Label>
      <Select.Trigger aria-label="Size" />
      <Select.Content>
        <Select.Item value={'xs'} label="xs" aria-label="xs" />
        <Select.Item value={'sm'} label="sm" aria-label="sm" />
        <Select.Item value={'md'} label="md" aria-label="md" />
        <Select.Item value={'lg'} label="lg" aria-label="lg" />
        <Select.Item value={'xl'} label="xl" aria-label="xl" />
      </Select.Content>
    </Select>
  );
};
