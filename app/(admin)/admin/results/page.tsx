'use client';
import { useGetResultsDataQuery } from '@/src/features/results/resultApiSlice';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import ResultList from '@/components/shared/results/results-list';

// const results = [
//   {
//     id: 'RES001',
//     studentName: 'John Doe',
//     term: 'First Term',
//     session: '2023/2024',
//     class: 'JSS1',
//     status: 'Published',
//   },
//   {
//     id: 'RES002',
//     studentName: 'Jane Smith',
//     term: 'Second Term',
//     session: '2023/2024',
//     class: 'SS2',
//     status: 'Unpublished',
//   },
//   {
//     id: 'RES003',
//     studentName: 'Ahmed Bello',
//     term: 'First Term',
//     session: '2023/2024',
//     class: 'JSS3',
//     status: 'Published',
//   },
// ];

const AdminResultsPage = () => {
  const { data: results, isLoading, isError } = useGetResultsDataQuery({});

  if (isLoading) {
    return <> Loading...</>;
  }

  if (isError || !results) {
    return <>Error fetching data</>;
  }

  return (
    <div className='p-4 space-y-6'>
      <h1 className='text-2xl font-semibold'>Results Overview</h1>

      {/* Summary Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>Total Results</CardTitle>
            <CardDescription>All uploaded results</CardDescription>
          </CardHeader>
          <CardContent className='text-3xl font-bold'>
            {results.totalResults}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Published</CardTitle>
            <CardDescription>Visible to students</CardDescription>
          </CardHeader>
          <CardContent className='text-3xl font-bold text-green-600'>
            {results.resultsWithPosition}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Unpublished</CardTitle>
            <CardDescription>Pending publication</CardDescription>
          </CardHeader>
          <CardContent className='text-3xl font-bold text-red-600'>
            {results.resultWithoutPosition}
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <ResultList results={results.results} />
    </div>
  );
};

export default AdminResultsPage;
