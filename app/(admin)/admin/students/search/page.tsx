'use client';
import StudentsTable from '@/components/shared/students/students-table';
import { useGetStudentsQuery } from '@/src/features/students/studentApiSlice';

const StudentSearchPage = () => {
  const { data, isLoading, isError } = useGetStudentsQuery({ page: 1 });
  const students = data?.students ?? [];

  return (
    <>
      <StudentsTable
        students={students}
        isLoading={isLoading}
        isError={isError}
      />
    </>
  );
};

export default StudentSearchPage;
