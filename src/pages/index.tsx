import type { NextPage } from 'next';
import Head from 'next/head';

//component
import UsersComponent from '../components/users/Index';

const Home: NextPage = () => {
  return (
    <>

      <Head>
        <title>Usuarios</title>
        <meta name="description" content="Mantenedor de usuarios" />
      </Head>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
        <div className='py-4'>
          <UsersComponent />
        </div>
      </div>
    </>
  );
};

export default Home;
