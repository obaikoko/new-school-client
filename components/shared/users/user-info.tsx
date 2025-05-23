'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormEvent } from 'react';

type Props<T> = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: T;
  onSubmit?: (e: FormEvent) => void;
  isLoading?: boolean;
  editable?: boolean;
  setData?: React.Dispatch<React.SetStateAction<T>>;
};

const EntityInfoDialog = <T extends Record<string, unknown>>({
  open,
  onOpenChange,
  data,
  onSubmit,
  isLoading,
  editable = false,
  setData,
}: Props<T>) => {
  const keys = Object.keys(data);

  
  const handleChange = (key: keyof T, value: T[keyof T]) => {
    if (setData) {
      setData((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Details</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className='grid gap-4 py-4'>
            {keys.map((key) => (
              <div className='grid grid-cols-4 items-center gap-4' key={key}>
                <Label className='capitalize'>{key}</Label>
                {editable ? (
                  <Input
                    className='col-span-3'
                    value={data[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                  />
                ) : (
                  <div className='col-span-3'>{data[key]}</div>
                )}
              </div>
            ))}
          </div>
          {editable && (
            <Button type='submit' disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update'}
            </Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EntityInfoDialog;
