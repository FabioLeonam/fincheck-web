import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import React from 'react';
import { cn } from '../../app/utils/cn';

function DropdownMenuRoot({ children }: { children: React.ReactNode}) {
  return(
    <RadixDropdownMenu.Root>
      { children }
    </RadixDropdownMenu.Root>
  );
}

function DropdownMenuTrigger({ children }: { children: React.ReactNode}) {
  return(
    <RadixDropdownMenu.Trigger asChild className="outline-none">
      { children }
    </RadixDropdownMenu.Trigger>
  );
}

interface DropdownMenuContentProps {
  children: React.ReactNode;
  className?: string;
}
function DropdownMenuContent({ children, className }: DropdownMenuContentProps) {
  return(
    <RadixDropdownMenu.Portal>
      <RadixDropdownMenu.Content
        className={cn(
        "rounded-2xl p-2 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] z-50",
        "data-[side=bottom]:animate-slide-up-and-fade data-[side=top]:animate-slide-down-and-fade",
        className
        )}>
        { children }
      </RadixDropdownMenu.Content>
    </RadixDropdownMenu.Portal>
  );
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  className?: string;
  onSelect?(): void;
}
function DropdownMenuItem({ children, className, onSelect }:DropdownMenuItemProps) {
  return(
    <RadixDropdownMenu.Item
      onSelect={onSelect}
      className={cn(
      'min-h-[40px] outline-none flex items-center px-4 py-2 text-sm text-gray-800 data-[highlighted]:bg-gray-50 rounded-xl transition-colors cursor-pointer',
      className
    )}>
      { children }
    </RadixDropdownMenu.Item>
  );
}

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem
}
