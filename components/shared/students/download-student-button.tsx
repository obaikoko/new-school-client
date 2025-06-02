'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { showZodErrors } from '@/lib/utils';
import { useState } from 'react';

const DownloadStudentDataButton = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleDownloadClick = () => {
    setDialogOpen(true);
  };

  const handleDownloadCSV = async () => {
    try {
      const response = await fetch(
        'https://bew-school-server.onrender.com/api/students/export-cvs',
        {
          method: 'GET',
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to download');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'studentsData.csv';
      a.click();
      window.URL.revokeObjectURL(url);

      setDialogOpen(false);
    } catch (err) {
      showZodErrors(err);
    }
  };

  return (
    <div>
      <Button
        variant='outline'
        className='cursor-pointer'
        onClick={handleDownloadClick}
      >
        Download Students Data
      </Button>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Download Student Data</DialogTitle>
            <DialogDescription>
              Download all student data as csv file
            </DialogDescription>
          </DialogHeader>
          <div className='flex justify-end'>
            <Button onClick={handleDownloadCSV}>Download CSV</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DownloadStudentDataButton;
