'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Calendar,
  User,
  Mail,
  Phone,
  Baby,
  GraduationCap,
  Venus,
  Clock,
} from 'lucide-react';
import { formatDateTime } from '@/lib/utils';
import { useGetSingleAdmissionQuery } from '@/src/features/admission/admissionApiSlice';
import Spinner from '@/components/shared/spinner';

const AdmissionDetails = ({ requestId }: { requestId: string }) => {
  const { data, isLoading, isError } = useGetSingleAdmissionQuery(requestId);

  if (isLoading)
    return (
      <Card>
        <CardContent>
          <Spinner />
          Loading admission requests...
        </CardContent>
      </Card>
    );
  if (isError || !data)
    return (
      <div>
        <Card>
          <CardContent>Failed to load students. Please try again.</CardContent>
        </Card>
      </div>
    );
  return (
    <div className=' mx-auto mt-12'>
      <Card className='shadow-xl'>
        <CardHeader>
          <CardTitle className='text-center text-2xl font-bold flex items-center justify-center gap-2'>
            <Baby className='w-6 h-6 ' />
            Admission Details
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <InfoItem
              icon={<User />}
              label='First Name'
              value={data.firstName}
            />
            <InfoItem icon={<User />} label='Last Name' value={data.lastName} />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <InfoItem icon={<Mail />} label='Email' value={data.email} />
            <InfoItem icon={<Phone />} label='Phone' value={data.phone} />
          </div>

          <InfoItem
            icon={<Baby />}
            label="Child's Name"
            value={data.childName}
          />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <InfoItem
              icon={<Calendar />}
              label='Date of Birth'
              value={formatDateTime(data.dateOfBirth)}
            />
            <InfoItem icon={<Venus />} label='Gender' value={data.gender} />
          </div>

          <InfoItem
            icon={<GraduationCap />}
            label='Class Applying For'
            value={data.level}
          />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <InfoItem
              icon={<Clock />}
              label='Created At'
              value={formatDateTime(data.createdAt)}
            />
            <InfoItem
              icon={<Clock />}
              label='Updated At'
              value={formatDateTime(data.updatedAt)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

type InfoItemProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

const InfoItem = ({ icon, label, value }: InfoItemProps) => (
  <div className='flex items-start gap-3 p-3 border rounded-lg bg-gray-50 dark:bg-gray-900'>
    <div>{icon}</div>
    <div>
      <div className='text-xs text-gray-500 dark:text-gray-400'>{label}</div>
      <div className='font-medium'>{value}</div>
    </div>
  </div>
);

export default AdmissionDetails;
