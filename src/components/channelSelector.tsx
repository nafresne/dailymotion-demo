import { useNavigate, useSearch } from '@tanstack/react-router';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const CHANNELS = [
  { id: 'lemondefr', name: 'lemondefr' },
  { id: 'taylorswift', name: 'taylorswift' },
  { id: 'C8TV', name: 'C8TV' },
];

export const ChannelSelector = () => {
  const search = useSearch({
    from: '/',
  });
  const navigate = useNavigate();

  const currentChannel = search.channel;

  if (!currentChannel) {
    return null;
  }

  const handleChannelChange = (channelId: string) => {
    navigate({ to: '/', search: { channel: channelId } });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {CHANNELS.find((ch) => ch.id === currentChannel)?.name ||
            currentChannel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {CHANNELS.map((channel) => (
          <DropdownMenuItem
            key={channel.id}
            onClick={() => handleChannelChange(channel.id)}
          >
            {channel.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
