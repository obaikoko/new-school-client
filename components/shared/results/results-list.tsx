import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StudentResult } from '@/schemas/resultSchema';
import Link from 'next/link';
import { useAppSelector } from '@/src/app/hooks';

const ResultList = ({ results }: { results: StudentResult[] }) => {
  const { user } = useAppSelector((state) => state.auth);

  console.log(user)
  return (
    <div className='overflow-x-auto'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Result ID</TableHead>
            <TableHead>Student</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Term</TableHead>
            <TableHead>Session</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((r) => (
            <TableRow key={r.id}>
              <TableCell>
                <Link
                  className='underline'
                  href={
                    user.isAdmin
                      ? `/admin/results/${r.id}`
                      : `/user/results/${r.id}`
                  }
                >
                  {`${r.id.slice(0, 6)}...`}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  className='underline'
                  href={
                    user.isAdmin
                      ? `/admin/students/${r.studentId}`
                      : `/user/students/${r.studentId}`
                  }
                >
                  {r.firstName} {r.lastName}
                </Link>
              </TableCell>
              <TableCell>
                {r.level}
                {r.subLevel}
              </TableCell>
              <TableCell>{r.term}</TableCell>
              <TableCell>{r.session}</TableCell>
              <TableCell className={'text-green-600 font-medium'}>
                Published
              </TableCell>
            </TableRow>
          ))}
          {results.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className='text-center py-4 text-muted-foreground'
              >
                No matching results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ResultList;
