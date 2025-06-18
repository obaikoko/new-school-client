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
import Spinner from '@/components/shared/spinner';

const AdminResultsPage = () => {
  const { data: results, isLoading, isError } = useGetResultsDataQuery({});

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Spinner /> Loading...
        </CardHeader>
      </Card>
    );
  }

  if (isError || !results) {
    return (
      <Card>
        <CardHeader>Error fetching data</CardHeader>
      </Card>
    );
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
            {results.publishedResults}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Unpublished</CardTitle>
            <CardDescription>Pending publication</CardDescription>
          </CardHeader>
          <CardContent className='text-3xl font-bold text-red-600'>
            {results.unpublishedResults}
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <ResultList results={results.results} />
    </div>
  );
};

export default AdminResultsPage;
