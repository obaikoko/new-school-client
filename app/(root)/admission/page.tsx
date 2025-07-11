// import AdmissionForm from '@/components/AdmissionForm';
import Onboarding from '@/components/shared/home-page/onboarding';
import React from 'react';
import AdmissionForm from './admission-form';

export const metadata = {
  title: 'Admission - Beryl International School',
  description:
    'Find out how to apply for admission to Beryl International School for nursery, primary, and secondary school in Calabar, Cross River State.',
  keywords:
    'Beryl International School admission, school enrollment, Calabar admissions, education in Cross River State, apply to Beryl International School',
};

const AdmissionPage = () => {
  return (
    <div>
      
      <div className='relative bg-gray-700 h-96 flex items-center justify-center'>
    
        <div className='relative z-10 text-center'>
          <h1 className='text-4xl font-bold text-white'>Admissions</h1>
          <p className='text-lg text-white mt-4'>
            Join our community of excellence!
          </p>
        </div>
      </div>

      <div className='mx-auto '>
        <Onboarding />
        <AdmissionForm />
      </div>
    </div>
  );
};

export default AdmissionPage;
