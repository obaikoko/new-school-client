import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StudentResult } from '@/schemas/resultSchema';
const ResultList = ({results}: {results: StudentResult[]}) => {
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
                <TableCell>{r.id}</TableCell>
                <TableCell>
                  {r.firstName} {r.lastName}
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
}
 
export default ResultList;