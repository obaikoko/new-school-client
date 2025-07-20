import Link from 'next/link';
import React from 'react';
import FacebookIcon from 'lucide-react/dist/esm/icons/facebook';
import InstagramIcon from 'lucide-react/dist/esm/icons/instagram';
import LinkedinIcon from 'lucide-react/dist/esm/icons/linkedin';
import YoutubeIcon from 'lucide-react/dist/esm/icons/youtube';
// import TwitterIcon from 'lucide-react/dist/esm/icons/twitter'; // use for "X"
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const WhatsAppIcon = () => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 24 24'
      fill='currentColor'
    >
      <path d='M20.52 3.48A12.07 12.07 0 0 0 3.49 20.52l-1.4 5.17 5.17-1.4A12.07 12.07 0 0 0 20.52 3.48zM12 21.5c-1.79 0-3.56-.47-5.1-1.36l-.36-.2-3.06.83.83-3.06-.2-.36A9.5 9.5 0 1 1 21.5 12 9.52 9.52 0 0 1 12 21.5zm4.73-6.78c-.26-.13-1.52-.75-1.75-.84s-.4-.13-.57.13-.66.84-.81 1.01-.3.2-.57.07a7.68 7.68 0 0 1-2.26-1.4 8.54 8.54 0 0 1-1.57-1.93c-.17-.3 0-.46.13-.59.13-.13.3-.33.43-.5s.17-.3.26-.5a.55.55 0 0 0-.03-.53c-.08-.13-.57-1.38-.78-1.88s-.41-.44-.57-.44H8.07a1.11 1.11 0 0 0-.8.37A3.37 3.37 0 0 0 6 10.83c0 1 .69 1.96.78 2.1s1.37 2.12 3.33 2.96c1.96.84 1.96.56 2.31.53s1.14-.46 1.3-.9.65-1.15.83-1.3.39-.2.65-.13 1.65.78 1.94.91.46.2.53.3.07.5-.03.97-.61 1.06-.83 1.13z' />
    </svg>
  );

  return (
    <footer className='bg-blue-950 outline text-white py-8 px-4'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
        {/* Contact Details */}
        <div>
          <h2 className='text-xl font-bold mb-4'>Contact Details</h2>
          <p className='mb-2'>Phone: 07060511978, 09073091617</p>
          <p className='mb-2'>Email: berylintlschl@gmail.com</p>
          <p>
            Location: Plot 1, Block 1, Ikot Eneobong (Federal Housing Estate)
            Calabar Municipality, Cross River State
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className='text-xl font-bold mb-4'>Quick Links</h2>
          <ul className='space-y-2'>
            <li>
              <Link href='/' className='hover:underline'>
                Home
              </Link>
            </li>
            <li>
              <Link href='/about' className='hover:underline'>
                About
              </Link>
            </li>
            <li>
              <Link href='/events' className='hover:underline'>
                Events
              </Link>
            </li>
            <li>
              <Link href='/admission' className='hover:underline'>
                Admission
              </Link>
            </li>
            <li>
              <Link href='/gallery' className='hover:underline'>
                Gallery
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className='text-xl font-bold mb-4'>Social Media</h2>
          <ul className='space-y-2'>
            <li>
              <Link href='' className='flex items-center hover:underline'>
                <InstagramIcon className='inline-block mr-2 text-2xl' />
                Instagram
              </Link>
            </li>
            <li>
              <Link href='' className='flex items-center hover:underline'>
                <LinkedinIcon className='inline-block mr-2 text-2xl' />
                LinkedIn
              </Link>
            </li>
            <li>
              <Link href='' className='flex items-center hover:underline'>
                <FacebookIcon className='inline-block mr-2 text-2xl' />
                Facebook
              </Link>
            </li>
            <li>
              <Link href='' className='flex items-center gap-2 hover:underline'>
                <WhatsAppIcon /> WhatsApp
              </Link>
            </li>
            <li>
              <Link
                href='https://www.youtube.com/@berylinternationalschools9663'
                className='flex items-center hover:underline'
              >
                <YoutubeIcon className='inline-block mr-2 text-2xl' />
                Youtube
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className='mt-8 border-t border-gray-700 pt-4 text-center'>
        <p className='text-gray-400'>
          &copy; {currentYear} Beryl International Schools. Powered by Beryl
          International Schools
        </p>
      </div>
    </footer>
  );
};

export default Footer;
