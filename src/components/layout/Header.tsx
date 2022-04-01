import React, { useState, useContext } from 'react';
import { MenuAlt2Icon } from '@heroicons/react/outline';

const Header = () => {

  return (
    <div className='sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow'>
      <button
        type='button'
        className='px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden'
        onClick={() => console.log('abrir_menu')}
      >
        <span className='sr-only'>Abrir</span>
        <MenuAlt2Icon className='h-6 w-6' aria-hidden='true' />
      </button>
      <div className='flex-1 px-4 flex justify-between'>
        <div className='flex-1 flex'>

        </div>
        <div className='ml-4 flex items-center md:ml-6'>
           <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100 border border-gray-300">
              <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
