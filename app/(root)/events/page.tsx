'use client';

import { motion } from 'framer-motion';
import EventCard from '@/components/shared/events/event-card';
import { Card, CardContent } from '@/components/ui/card';
import { useGetEventsQuery } from '@/src/features/events/eventApiSlice';
import Image from 'next/image';
import Spinner from '@/components/shared/spinner';

const EventPage = () => {
  const { data, isLoading, isError } = useGetEventsQuery();

  return (
    <div className=' overflow-x-hidden'>
      {/* Hero Banner with motion */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className='relative flex items-center justify-center h-[300px] md:h-[400px] overflow-hidden'
      >
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 10,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className='absolute inset-0 z-0'
        >
          <Image
            width={1920}
            height={1080}
            src='/images/sport1.jpg'
            alt='Background'
            className='w-full h-full object-cover opacity-60'
          />
        </motion.div>
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
          className='relative z-10  text-4xl md:text-6xl font-bold'
        >
          Upcoming Events
        </motion.h1>
      </motion.div>

      {isLoading && (
        <Card>
          <CardContent>
            <Spinner /> Loading events...
          </CardContent>
        </Card>
      )}

      {isError && (
        <Card>
          <CardContent>Failed to load events.</CardContent>
        </Card>
      )}
      {/* Events Grid */}
      <div className='min-h-screen py-16 '>
        <div className='container mx-auto px-4 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center'>
            {data &&
              data.map((event, idx) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: idx * 0.1,
                    duration: 0.6,
                    type: 'spring',
                    stiffness: 120,
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ rotate: 1 }}
                >
                  <motion.div
                    whileHover={{ rotateY: 180 }}
                    transition={{ duration: 0.6 }}
                    className='perspective'
                  >
                    <EventCard event={event} />
                  </motion.div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
