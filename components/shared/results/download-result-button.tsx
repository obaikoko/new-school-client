'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Download } from 'lucide-react';

const DownloadResult = ({ resultId }: { resultId: string }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/results/pdf/${resultId}`,
        {
          method: 'GET',
        }
      );

      if (!res.ok) throw new Error('Failed to fetch PDF');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `result-${resultId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      // Close only after successful download
      setOpen(false);
    } catch (error) {
      console.error('Download error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant='outline' onClick={() => setOpen(true)}>
        <Download className='mr-2 h-4 w-4' />
        Download Result
      </Button>

      <Dialog open={open} onOpenChange={(val) => !loading && setOpen(val)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Download Result</DialogTitle>
            <DialogDescription>
              Are you sure you want to download this result as a PDF?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className='flex justify-end gap-2'>
            <Button
              variant='outline'
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button onClick={handleDownload} disabled={loading}>
              {loading ? 'Downloading...' : 'Confirm'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DownloadResult;
