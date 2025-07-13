'use client';

import Image from 'next/image';
import { EventSchema } from '@/schemas/eventSchema';
import { formatDateTime } from '@/lib/utils';

const EventCard = ({ event }: { event: EventSchema }) => {
  return (
    <div>
      <div className=' shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden mx-4 my-6 outline'>
        <Image
          width={500}
          height={500}
          src={event.imageUrl}
          alt={event.title}
          className='w-full h-56 object-cover'
        />
        <div className='p-6'>
          <h3 className='text-2xl font-semibold  mb-3 line-clamp-1'>
            {event.title}
          </h3>
          <p className=' mb-4 line-clamp-2'>{event.description}</p>
          <span className='block text-sm 0 italic'>
            {formatDateTime(event.date)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
