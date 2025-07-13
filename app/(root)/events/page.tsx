'use client';
import EventCard from '@/components/shared/events/event-card';
import { Card, CardContent } from '@/components/ui/card';

import { useGetEventsQuery } from '@/src/features/events/eventApiSlice';
// import Image from 'next/image';

const EventPage = () => {
  const { data, isLoading, isError } = useGetEventsQuery();

  if (isLoading) {
    return (
      <div className='p-6'>
        <Card>
          <CardContent>Loading events...</CardContent>
        </Card>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className='p-6'>
        <Card>
          <CardContent>Failed to load events.</CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='mt-20'>
      <div className='relative  flex items-center justify-center '>
        {/* <Image
          width={500}
          height={500}
          src='/images/sport1.jpg'
          alt=''
          className='absolute inset-0 w-full h-full object-cover opacity-50'
        /> */}
        <h1 className='relative text-4xl font-bold '>Upcoming Events</h1>
      </div>
      <div className='min-h-screen  py-12'>
        <div className='container mx-auto px-4 lg:px-8'>
          <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center'>
            {data.length === 0 ? (
              <h1 className='text-3xl text-center'>
                No Events Yet, Please Check Back Later.
              </h1>
            ) : (
              data.map((event) => <EventCard key={event.id} event={event} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
