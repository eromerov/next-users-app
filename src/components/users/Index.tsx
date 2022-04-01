import axios from 'axios';
import config from 'next/config';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { UserAddIcon, PencilIcon, TrashIcon } from '@heroicons/react/outline';
import Spinner from '../ui/Spinner';

//form
import UserForm from './UserForm';
import DeleteUser from './DeleteUser';

//data
import type { User } from '../../data/user';

//config
const { publicRuntimeConfig } = config();
const baseURL = publicRuntimeConfig.API_URL;

function UsersComponent() {

  const [loading, setLoading] = useState(true);

  const [openDialog, setOpenDialog] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const [formData, setFormData] = useState<User>();
  const [users, setUsers] = useState<User[]>([]);
  
  const [selectedUserId, setSelectedUserId] = useState('');

  const getUsers = async () => {

    const http = axios.create({
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await http.get('/users').catch((error) => console.log(error));

    if (response) {
      setUsers(response.data);
    }

    setLoading(false);
  };

  const handleUpdate = async (userId: string) => {
    
    const http = axios.create({
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await http.get(`/users/${userId}`).catch((error) => console.log(error));

    if (response) {
      setFormData(response.data);
    }


    setOpenForm(!openForm);
  }

  const handleDelete = (userId: string) => {
    setSelectedUserId(userId);
    setOpenDialog(!openDialog);
  }

  const closeUserForm = () => {
    setFormData(undefined);
    setOpenForm(!openForm);
  };

  const closeDeleteDialog = () => {
    setOpenDialog(!openDialog);
  };


  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <UserForm
        open={openForm}
        selectedUser={formData}
        handleClose={closeUserForm}
        getUsers={getUsers}
      />

      <DeleteUser
        open={openDialog}
        handleClose={closeDeleteDialog}
        getUsers={getUsers}
        userId={selectedUserId}
      />

      <div className='-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap py-8'>
        <div className='ml-4 mt-2'>
          <h3 className='text-lg leading-6 font-medium text-gray-900'>
            Usuarios
          </h3>
          <p className='mt-1 text-sm text-gray-500'>
            Gestión de cuentas de usuario
          </p>
        </div>
        <div className='ml-4 mt-2 flex-shrink-0'>
          <button
            type='button'
            onClick={() => setOpenForm(true)}
            className='relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            <UserAddIcon className='mr-2 h-5 w-5' aria-hidden='true' />
            <span>Agregar Usuario</span>
          </button>
        </div>
      </div>

      {/* table */}
      <div className='bg-white shadow border border-gray-50 rounded-lg'>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50 tracking-wider text-slate'>
              <tr>
                <th scope='col' className='table-th'>
                  Id
                </th>
                <th scope='col' className='table-th'>
                  Nombre
                </th>
                <th scope='col' className='table-th'>
                  Email
                </th>
                <th scope='col' className='table-th'>
                  Password
                </th>
                <th scope='col' className='table-th'>
                  Administrador
                </th>
                <th scope='col' className='relative px-6 py-3'>
                  <span className='sr-only'>acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-100 min-h-5'>
              
              { loading && (
                <tr>
                  <td className='py-3 text-center' colSpan={6}>
                      <Spinner />
                  </td>
                </tr>
              )}

              { (!loading && isEmpty(users)) && (
                <tr>
                  <td className='py-3 text-center' colSpan={6}>
                    No hay usuarios para mostrar
                  </td>
                </tr>
              )}

              {users.map((user, i) => (
                <tr key={user.email} className='hover:bg-[#F6F8F8]'>
                  <td className='px-6 py-3 whitespace-nowrap'>{user.id}</td>
                  <td className='px-6 py-3 whitespace-nowrap'>{user.name}</td>
                  <td className='px-6 py-3 whitespace-nowrap'>{user.email}</td>
                  <td className='px-6 py-3 whitespace-nowrap'>{user.password}</td>
                  <td className='px-6 py-3 whitespace-nowrap'>
                    { user.isAdmin ? "SI": "NO" }
                  </td>
                  <td className='text-center'>
                    <div className='flex'>
                      <button
                        type="button"
                        onClick={ () => handleUpdate(user.id)}
                        className="rounded-full h-8 w-8 flex items-center justify-center text-gray-500 hover:bg-blue-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-100"
                      >
                        <PencilIcon className="h-5 w-5" aria-hidden="true" />
                        <span className="sr-only">Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={ () => handleDelete(user.id)}
                        className="rounded-full h-8 w-8 flex items-center justify-center text-gray-500 hover:bg-red-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-100"
                      >
                        <TrashIcon className="h-5 w-5" aria-hidden="true" />
                        <span className="sr-only">Remove</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      

    </>
  );
}

export default UsersComponent;
