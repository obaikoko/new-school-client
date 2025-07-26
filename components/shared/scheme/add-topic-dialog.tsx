'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function AddTopicDialog({ subject }: { subject: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'>
          <Plus className='h-4 w-4 mr-1' />
          Add Topic
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Topic for {subject}</DialogTitle>
        </DialogHeader>
        {/* Include your form here */}
        <div>Form goes here...</div>
      </DialogContent>
    </Dialog>
  );
}
