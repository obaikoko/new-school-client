'use client';
import ResultSearch from '@/components/shared/results/result-search';
import ResultList from '@/components/shared/results/results-list';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useSearchResultsQuery } from '@/src/features/results/resultApiSlice';
import { useSearchParams } from 'next/navigation';

const ResultsSearchPage = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword');
  const level = searchParams.get('level');

  const { data, isLoading, isError } = useSearchResultsQuery({
    keyword,
    level,
    page: 1,
  });
  const results = data?.results ?? [];

  return (
    <>
      <div className='mb-10'>
        <ResultSearch />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Search Results</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Search Results for all {keyword} in {level}
          </CardDescription>
        </CardContent>
        <ResultList results={results} loading={isLoading} error={isError} />
      </Card>
    </>
  );
};

export default ResultsSearchPage;
