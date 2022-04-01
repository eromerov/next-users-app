import * as Yup from 'yup';
import axios from 'axios';
import config from 'next/config';
import { useState, Fragment, MouseEventHandler, useMemo, useRef, useEffect } from 'react';
import { Transition as X, Dialog, Switch } from '@headlessui/react';
import { Formik, Form, Field, FormikHelpers } from 'formik';

//ui
import { XIcon, EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import { User } from '../../data/user';
import _, { isElement, set } from 'lodash';

//config
const { publicRuntimeConfig } = config();
const baseURL = publicRuntimeConfig.API_URL;

//validation
const schema = Yup.object({
  name: Yup.string().required('Campo requerido'),
  email: Yup.string().required('Campo requerido').email('Ingrese un email válido'),
  password: Yup.string().required('Campo requerido'),
});

type Props = {
  open: boolean;
  selectedUser: User | undefined;
  getUsers: any;
  handleClose: any;
};

const UserForm = ({ open, getUsers, handleClose, selectedUser } : Props) => {

  const cancelButtonRef = useRef(null);
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const initialValues : User = {
    id: '',
    name: '',
    email: '',
    password: '',
    isAdmin: false
  }

  if(selectedUser) {
    initialValues.id = selectedUser.id;
    initialValues.name = selectedUser.name;
    initialValues.email = selectedUser.email;
    initialValues.password = selectedUser.password;
    initialValues.isAdmin = selectedUser.isAdmin;
  }

  async function handleSubmit(data: User, { setSubmitting, resetForm }: FormikHelpers<User>) {
    setSaving(true);

    const http = axios.create({
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    // create user
    if(_.isEmpty(data.id)) {

      const response = await http.post('/users', { 
        name: data.name,  
        email: data.email,
        password: data.password,
        isAdmin: data.isAdmin
      });

      console.log(`[http-post] ${response.status}`);

    }
    else {

      const response = await http.put('/users', data);
      console.log(`[http-put] ${response.status}`);
    }


    resetForm();
    setSaving(false);

    handleClose();
    getUsers();

  }



  return (
    <X.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='fixed z-10 inset-0 overflow-y-auto'
        initialFocus={cancelButtonRef}
        onClose={handleClose}
      >
        <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          
          <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />

          <X.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle'>
              <div className='w-screen max-w-xl'>
                <Formik
                  initialValues={initialValues}
                  validationSchema={schema}
                  validateOnBlur={false}
                  validateOnChange={false}
                  onSubmit={handleSubmit}
                >
                  {({ errors }) => (
                    <Form>
                      <div className='flex-1'>

                        {/* header */}
                        <div className='px-4 py-8 bg-gray-50 sm:px-6'>
                          <div className='flex items-center justify-between'>
                              <div className='space-y-1'>
                                <div className='text-xl font-medium'>
                                  Formulario Usuario
                                </div>
                              </div>
                              <div className='ml-3 flex h-4 items-center'>
                                <button type='button' className='text-slate' onClick={handleClose}>
                                  <span className='sr-only'>Cerrar</span>
                                  <XIcon className='h-6 w-6' aria-hidden='true' />
                                </button>
                            </div>
                            </div>
                        </div>

                        {/* content */}
                        <div className='px-4 py-8 space-y-3'>

                          {/* Name */}
                          <div className='px-4 sm:px-6 sm:grid sm:grid-cols-3 sm:gap-4'>                    
                            <label htmlFor='name' className='form-label'>
                              Nombre
                            </label>
                            <div className='sm:col-span-2'>
                              <Field type='text' id='name' name='name' className='w-full form-input no-ring' />
                              {errors.name && <div className='text-sm text-red-500 mt-1 font-light'>{errors.name}</div>}
                            </div>
                          </div>


                          {/* Email */}
                          <div className='px-4 sm:px-6 sm:grid sm:grid-cols-3 sm:gap-4'>                    
                            <label htmlFor='email' className='form-label'>
                              Email
                            </label>
                            <div className='sm:col-span-2'>
                              <Field type='text' id='email' name='email' className='w-full form-input no-ring' />
                              {errors.email && <div className='text-sm text-red-500 mt-1 font-light'>{errors.email}</div>}
                            </div>
                          </div>

                          {/* Password */}
                          <div className='px-4 sm:px-6 sm:grid sm:grid-cols-3 sm:gap-4'>
                            <label htmlFor='password' className='form-label'>
                              Password
                            </label>
                            <div className='sm:col-span-2'>
                              <div className='mt-1 relative flex items-center'>
                                <Field
                                  type={showPassword ? 'text' : 'password'}
                                  id='password'
                                  name='password'
                                  className='w-full form-input no-ring'
                                />
                                <div className='absolute inset-y-0 right-0 flex py-1.5 pr-1.5'>
                                  <button
                                    type='button'
                                    className='-ml-px relative inline-flex items-center space-x-2 p-2 text-sm hover:bg-gray-100 focus:outline-none focus:ring-0 rounded-full'
                                    onClick={() => setShowPassword(!showPassword)}
                                  >

                                    {
                                      showPassword ? <EyeIcon className='h-5 w-5' aria-hidden='true' />  : <EyeOffIcon className='h-5 w-5' aria-hidden='true' /> 
                                    }

                                  </button>
                                </div>                                
                              </div>
                              {errors.password && <div className='text-sm text-red-500 mt-1 font-light'>{errors.password}</div>}
                            </div>
                          </div>

                          {/* IsAdmin */}
                          <div className='px-4 py-4 sm:px-6 sm:grid sm:grid-cols-3 sm:gap-4'>
                            <label htmlFor='isAdmin' className='form-label'>Administrador</label>
                            <div className='sm:col-span-2 space-y-2'>
                              <Field type="checkbox" name="isAdmin" className="focus:ring-sky-500 h-4 w-4 text-sky-500 border-gray-300 rounded bg-sky-500" />                             
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* buttons */}
                      <div className='flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6'>
                        <div className='space-x-3 flex justify-end'>
                          <button
                            type='button'
                            className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-blue-gray-900 hover:bg-blue-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                            onClick={handleClose}
                          >
                            Cancelar
                          </button>


                          {
                            saving ? 
                            (
                              <button
                              type="button"
                              className="w-full inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-400 text-base font-medium text-white hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                              disabled={true}
                              
                            >
                              <svg role="status" className="inline mr-2 w-4 h-4 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                              </svg>
                              Guardando...
                            </button>

                            ) :
                            (
                              <button
                                type='submit'
                                className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                >
                              Guardar
                              </button>
                            )
                          }


                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </X.Child>
        </div>
      </Dialog>
    </X.Root>
  );
};

export default UserForm;
