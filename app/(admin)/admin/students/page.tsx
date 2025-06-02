'use client';

import { useGetStudentsQuery } from '@/src/features/students/studentApiSlice';
import StudentsSearch from '@/components/shared/students/student-search';
import StudentsTable from '@/components/shared/students/students-table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Student } from '@/schemas/studentSchema';
import DownloadStudentDataButton from '@/components/shared/students/download-student-button';
import GraduateStudentsButton from '@/components/shared/students/graduate-students-button';
import Pagination from '@/components/shared/pagination';
import { useState } from 'react';

const StudentsPage = () => {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isError } = useGetStudentsQuery(page);
  const students = data?.students ?? [];
  const totalPages = data?.totalPages ?? 1;

  const total = students.length;
  const males = students.filter((s: Student) => s.gender === 'Male').length;
  const females = students.filter((s: Student) => s.gender === 'Female').length;

  return (
    <div className='p-4 space-y-6'>
      <h1 className='text-2xl font-semibold'>Students Overview</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>Total Students</CardTitle>
            <CardDescription>All registered students</CardDescription>
          </CardHeader>
          <CardContent className='text-3xl font-bold'>
            {isLoading ? 'Loading...' : total}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Male Students</CardTitle>
            <CardDescription>Number of boys</CardDescription>
          </CardHeader>
          <CardContent className='text-3xl font-bold text-blue-600'>
            {isLoading ? 'Loading...' : males}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Female Students</CardTitle>
            <CardDescription>Number of girls</CardDescription>
          </CardHeader>
          <CardContent className='text-3xl font-bold text-pink-600'>
            {isLoading ? 'Loading...' : females}
          </CardContent>
        </Card>
      </div>

      <StudentsSearch />

      <div className='overflow-x-auto'>
        <StudentsTable
          students={students}
          isLoading={isLoading}
          isError={isError}
        />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Important Buttons</CardTitle>
          <CardDescription className='text-destructive'>
            Note that this buttons here are marked as important button.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col md:flex-row gap-3'>
            <DownloadStudentDataButton />
            <GraduateStudentsButton />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentsPage;
