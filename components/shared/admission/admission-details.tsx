'use client';

import React from 'react';
import { useGetSingleAdmissionQuery } from '@/src/features/admission/admissionApiSlice';
import { formatDateTime } from '@/lib/utils';
import Spinner from '@/components/shared/spinner';
import { Card } from '@/components/ui/card';

const AdmissionDetails = ({ requestId }: { requestId: string }) => {
  const { data, isLoading, isError } = useGetSingleAdmissionQuery(requestId);

  if (isLoading) {
    return (
      <div className='mt-12 flex justify-center'>
        <Spinner />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className='mt-12 text-center text-destructive'>
        Failed to load admission data. Please try again.
      </div>
    );
  }

  return (
    <div className='mt-4 max-w-5xl mx-auto px-4'>
      <Card className='overflow-hidden shadow-lg border border-muted'>
        <div className=' p-6'>
          <h2 className='text-2xl font-bold mb-1'>Admission Summary</h2>
          <p className='text-sm opacity-90'>
            Review submitted details for this admission request.
          </p>
        </div>

        <div className='p-6 grid grid-cols-1 sm:grid-cols-2 gap-6'>
          <Detail label='First Name' value={data.firstName} />
          <Detail label='Last Name' value={data.lastName} />
          <Detail label='Email Address' value={data.email} />
          <Detail label='Phone Number' value={data.phone} />
          <Detail label="Child's Name" value={data.childName} />
          <Detail
            label='Date of Birth'
            value={formatDateTime(data.dateOfBirth)}
          />
          <Detail label='Gender' value={data.gender} />
          <Detail label='Class Applying For' value={data.level} />
          <Detail label='Submitted At' value={formatDateTime(data.createdAt)} />
          <Detail label='Last Updated' value={formatDateTime(data.updatedAt)} />
        </div>
      </Card>
    </div>
  );
};

const Detail = ({ label, value }: { label: string; value: string }) => (
  <div className='space-y-1'>
    <p className='text-xs uppercase font-semibold  '>{label}</p>
    <p className='text-base font-medium  dark:'>{value}</p>
  </div>
);

export default AdmissionDetails;
