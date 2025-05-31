'use client';
import StudentsSearch from '@/components/shared/students/student-search';
import StudentsTable from '@/components/shared/students/students-table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useSearchStudentsQuery } from '@/src/features/students/studentApiSlice';
import { useSearchParams } from 'next/navigation';
// import { useEffect, useState } from 'react';

const StudentSearchPage = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword');
  const level = searchParams.get('level');
  // const [name, setName] = useState(null);
  // const [studentClass, setStudentClass] = useState('All');
  // const [page, setPage] = useState(1);
  // const [loading, setLoading] = useState(false);
  const { data, isLoading, isError } = useSearchStudentsQuery({
    keyword,
    level,
    page: 1,
  });
  const students = data?.students ?? [];

  // useEffect(() => {
  //   setName(keyword);
  //   setStudentClass(level);
  //   setLoading(isLoading);
  //   if (isError) {
  //     setLoading(false);
  //   }
  // }, [data, isError, keyword, level, isLoading]);

  return (
    <>
      <StudentsSearch />
      <Card>
        <CardHeader>
          <CardTitle>Search Results</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Search Results for {keyword} in {level}
          </CardDescription>
        </CardContent>
        <StudentsTable
          students={students}
          isLoading={isLoading}
          isError={isError}
        />
      </Card>
    </>
  );
};

export default StudentSearchPage;
