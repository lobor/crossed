import { Button, Text, UilMessage, XBox, YBox } from '@crossed/ui';
import type { Props } from '../../props';

export const ButtonDemo = ({ size, color, variant }: Props) => {
  return (
    <XBox space="md">
      <YBox space="sm">
        <Text>Simple</Text>
        <Button
          aria-label="Button simple"
          text="Button"
          icon={<UilMessage />}
          color={color}
          size={size}
          variant={variant as any}
        />
        <Button
          aria-label="disabled Button"
          text="Disabled"
          icon={<UilMessage />}
          color={color}
          size={size}
          variant={variant as any}
          disabled
        />
      </YBox>
      <YBox space="sm">
        <Text>Advanced</Text>
        <Button
          aria-label="advanced Button"
          color={color}
          size={size}
          variant={variant as any}
        >
          <Button.Icon>
            <UilMessage />
          </Button.Icon>
          <Button.Text>Button</Button.Text>
        </Button>
        <Button
          aria-label="disabled Button advanced"
          color={color}
          size={size}
          variant={variant as any}
          disabled
        >
          <Button.Icon>
            <UilMessage />
          </Button.Icon>
          <Button.Text>Disabled</Button.Text>
        </Button>
      </YBox>
    </XBox>
  );
};
