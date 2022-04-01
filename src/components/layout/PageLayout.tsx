import { ReactNode } from 'react';

//layout
import Header from './Header';
import Sidebar from './Sidebar';

type Props = {
  children: ReactNode;
};

const PageLayout = ({ children }: Props) => {
  return (
    <>
      <div>
        <Sidebar />
        <div className='md:pl-64 flex flex-col flex-1'>
          <Header />
          <main className='flex-1'>
            <div>{children}</div>
          </main>
        </div>
      </div>
    </>
  );
};

export default PageLayout;
