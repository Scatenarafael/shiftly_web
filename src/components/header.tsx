import { AlignLeft, AlignRight, DoorOpen } from 'lucide-react';

import { AuthContext } from '@/contexts/AuthContext';
// import { useWaterfallSocket } from '@/hooks/useWaterfallSocket';
import { useContext } from 'react';
import { ModeToggle } from './toggle-theme';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Skeleton } from './ui/skeleton';

export function Header() {
  const {
    profile: user,
    signOutFn,
    showNavMenu,
    setShowNavMenu,
  } = useContext(AuthContext);

  // const { sendJsonMessage } = useWaterfallSocket({});

  // function handleSendWebSocketMessage() {
  //   const arg_socket_send_msg = `{"cable_id": "1", "live": "true", "time_interval": "60", "start_channel":"0","end_channel":"300"}"}`;

  //   sendJsonMessage(arg_socket_send_msg);
  // }
  return (
    <div className="flex max-h-14 flex-1 justify-between items-center bg-gradient-to-r from-foreground to-primary/70 px-6 py-2 dark:from-primary/70">
      {!showNavMenu ? (
        <Button
          variant="ghost"
          onClick={() => {
            setShowNavMenu(true);
          }}
          className="group"
        >
          <AlignLeft className="text-primary-foreground dark:text-foreground h-6 w-6 group-hover:text-primary group-hover:dark:text-foreground" />
        </Button>
      ) : (
        <Button
          variant="ghost"
          onClick={() => {
            setShowNavMenu(false);
          }}
          className="group"
        >
          <AlignRight className="text-primary-foreground dark:text-foreground h-6 w-6 group-hover:text-primary group-hover:dark:text-foreground" />
        </Button>
      )}
      {/* <Button onClick={handleSendWebSocketMessage}>Test websocket</Button> */}
      <div className="flex items-center gap-2">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger>
            {user ? (
              <div className="space-y-1 rounded-lg px-8 py-2 text-start text-xs text-white hover:bg-accent/20">
                <p>{user.username}</p>
                <p>{user.email}</p>
              </div>
            ) : (
              <div className="space-y-1 rounded-lg px-8 py-2 text-start text-xs text-white hover:bg-accent/20">
                <Skeleton className="h-4 w-32 animate-pulse rounded-none bg-accent-foreground/20" />
                <Skeleton className="h-4 w-32 animate-pulse rounded-none bg-accent-foreground/20" />
              </div>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="cursor-pointer space-x-2 hover:bg-accent">
              <Button
                variant="ghost"
                onClick={() => {
                  signOutFn();
                }}
              >
                <DoorOpen className="h-5 w-5" />
                <span>Sign out</span>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
