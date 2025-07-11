'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { useGetAllAdmissionQuery } from '@/src/features/admission/admissionApiSlice';
import { Card, CardContent } from '@/components/ui/card';
import Spinner from '@/components/shared/spinner';
import { formatDateTime } from '@/lib/utils';
import { AdmissionSchema } from '@/schemas/admissionSchema';
const AdmissionRequestPage = () => {
  const { data, isLoading, isError } = useGetAllAdmissionQuery({});

  if (isLoading)
    return (
      <Card>
        <CardContent>
          <Spinner />
          Loading admission requests...
        </CardContent>
      </Card>
    );
  if (isError)
    return (
      <div>
        <Card>
          <CardContent>Failed to load students. Please try again.</CardContent>
        </Card>
      </div>
    );

  return (
    <>
      <div className='max-h-[400px] overflow-y-auto border rounded-md'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.admission &&
              data.admission.map(({ adm }: { adm: AdmissionSchema }) => (
                <TableRow key={adm.id}>
                  <TableCell>{adm.id.slice(0, 5)}...</TableCell>
                  <TableCell className='cursor-pointer text-primary underline'>
                    <Link href={`/admin/admission/${adm.id}`}>
                      {adm.firstName}
                    </Link>
                  </TableCell>
                  <TableCell>{adm.lastName}</TableCell>
                  <TableCell>{adm.gender}</TableCell>
                  <TableCell>{adm.level}</TableCell>
                  <TableCell>{formatDateTime(adm.createdAt)}</TableCell>
                </TableRow>
              ))}
            {data.admission.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className='text-center py-4 text-muted-foreground'
                >
                  No admission request found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default AdmissionRequestPage;
