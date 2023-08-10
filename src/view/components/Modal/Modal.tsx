import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '../../../app/utils/cn';
import React from 'react';

import { ModalHeader } from './ModalHeader';
import { ModalContent } from './ModalContent';

interface ModalProps {
  open: boolean;
  children: React.ReactNode;

}
export function Modal({ open, children }: ModalProps){
  return(
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            'fixed inset-0 bg-black/80 backdrop-blur z-50',
            'data-[state=open]:animate-overlay-show',
        )}
        />
        <Dialog.Content
          className={cn(
            'fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 p-6 space-y-10 bg-white rounded-2xl outline-none',
            'z-[51] shadow-[0px_11px_20px_0px_rgba(0,_0,_0,_0.10) w-full max-w-[400px]',
            'data-[state=open]:animate-content-show')}
        >
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>

  )
}

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
