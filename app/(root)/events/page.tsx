'use client';
import EventCard from '@/components/shared/events/event-card';
import Spinner from '@/components/shared/spinner';

import { useGetEventsQuery } from '@/src/features/events/eventApiSlice';
import Image from 'next/image';

const EventPage = () => {
  const { data, isLoading, isError } = useGetEventsQuery();

  return (
    <>
      <div className='relative h-80 bg-blue-950 flex items-center justify-center'>
        <Image
          width={500}
          height={500}
          src='/images/sport1.jpg'
          alt=''
          className='absolute inset-0 w-full h-full object-cover opacity-50'
        />
        <h1 className='relative text-4xl font-bold text-white'>
          Upcoming Events
        </h1>
      </div>
      <div className='min-h-screen bg-gray-100 py-12'>
        {isLoading && <Spinner />}
        <div className='container mx-auto px-4 lg:px-8'>
          <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center'>
            {isError && (
              <h1 className='text-3xl text-center'>
                No Events Yet, Please Check Back Later.
              </h1>
            )}

            {data &&
              !isError &&
              data.map((event) => <EventCard key={event.id} event={event} />)}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventPage;
