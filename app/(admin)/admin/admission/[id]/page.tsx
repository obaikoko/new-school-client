// 'use client'

// import { useGetSingleAdmissionQuery } from "@/src/features/admission/admissionApiSlice";

// const AdmissionDetailsPage = () => {

//     const {data, isLoading, isError} = useGetSingleAdmissionQuery({})
//   return <>Admission Details</>;
// };

// export default AdmissionDetailsPage;

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
const admissionData = {
  id: '680b22711191a445c2d4feed',
  firstName: 'Favour',
  lastName: 'KUKEUNIM',
  email: 'kukeunimufushebe@gmail.com',
  phone: '7038610586',
  childName: 'Akeke  Favour Kukeunim',
  dateOfBirth: '2022-05-20T00:00:00.000Z',
  gender: 'Female',
  level: 'creche',
  createdAt: '2025-04-25T05:49:37.084Z',
  updatedAt: '2025-04-25T05:49:37.084Z',
};

const AdmissionDetailsPage = () => {
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
              value={admissionData.firstName}
            />
            <InfoItem
              icon={<User />}
              label='Last Name'
              value={admissionData.lastName}
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <InfoItem
              icon={<Mail />}
              label='Email'
              value={admissionData.email}
            />
            <InfoItem
              icon={<Phone />}
              label='Phone'
              value={admissionData.phone}
            />
          </div>

          <InfoItem
            icon={<Baby />}
            label="Child's Name"
            value={admissionData.childName}
          />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <InfoItem
              icon={<Calendar />}
              label='Date of Birth'
              value={formatDateTime(admissionData.dateOfBirth)}
            />
            <InfoItem
              icon={<Venus />}
              label='Gender'
              value={admissionData.gender}
            />
          </div>

          <InfoItem
            icon={<GraduationCap />}
            label='Class Applying For'
            value={admissionData.level}
          />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <InfoItem
              icon={<Clock />}
              label='Created At'
              value={formatDateTime(admissionData.createdAt)}
            />
            <InfoItem
              icon={<Clock />}
              label='Updated At'
              value={formatDateTime(admissionData.updatedAt)}
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

export default AdmissionDetailsPage;
