import { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import {
  createBill,
  deleteBill,
  fetchBills,
  fetchBillsByCategories,
  updateBill,
} from '../store/slices/billSlice';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { Dialog, Transition } from '@headlessui/react';

const Bills = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const state: any = useSelector((state: RootState) => state.bills);
  const [selectCategory, setSelectCategory] = useState('');
  const [method, setMethod] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    dispatch(fetchBills());
  }, [open, dispatch]);

  const deleteBillFrom = async (id: any) => {
    dispatch(deleteBill(id));
  };

  const addBill = () => {
    const data = { category, description, amount };
    dispatch(createBill(data));
    setOpen(false);
    setCategory('');
    setDescription('');
    setAmount('');
  };

  return (
    <>
      <div className='relative mt-10 overflow-x-auto shadow-md sm:rounded-lg'>
        <div className='flex justify-between my-2 ml-5 text-2xl font-extrabold '>
          <h1>All Bills</h1>
          <div>
            <select
              className='w-24 p-2 mx-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 '
              value={selectCategory}
              onChange={(e) => setSelectCategory(e.target.value)}
              onClick={() => dispatch(fetchBillsByCategories(selectCategory))}
            >
              {state?.categories?.map((category: any, id: number) => {
                return (
                  <option value={category.category} key={id}>
                    {category.category}{' '}
                  </option>
                );
              })}
            </select>
            <button
              className='mr-5 py-2.5 px-5  mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
              onClick={() => {
                setMethod(false);
                setOpen(true);
              }}
            >
              Add New Bill
            </button>
          </div>
        </div>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Description
              </th>
              <th scope='col' className='px-6 py-3'>
                Category
              </th>
              <th scope='col' className='px-6 py-3'>
                Amount
              </th>
              <th scope='col' className='px-6 py-3'>
                Date
              </th>
              <th scope='col' className='px-6 py-3'>
                <span className='sr-only'>Edit</span>
              </th>
              <th scope='col' className='px-6 py-3'>
                <span className='sr-only'>Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {state?.bills &&
              state?.bills?.map((bill: any) => {
                return (
                  <>
                    <tr
                      className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                      key={bill?._id}
                    >
                      <th
                        scope='row'
                        className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                      >
                        {bill?.description}
                      </th>
                      <td className='px-6 py-4'>{bill?.category}</td>
                      <td className='px-6 py-4'>{bill?.amount}</td>
                      <td className='px-6 py-4'>
                        {bill?.createdAt.substring(0, 10)}
                      </td>
                      <td
                        className='px-6 py-4 text-right cursor-pointer'
                        onClick={() => deleteBillFrom(bill._id)}
                      >
                        <MdDelete size={20} />
                      </td>
                      <td
                        className='px-6 py-4 text-right cursor-pointer'
                        onClick={() => {
                          setMethod(true);
                          setOpen(true);
                          setId(bill._id);
                        }}
                      >
                        <FaEdit size={20} />
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as='div' className='relative z-[100]' onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75' />
          </Transition.Child>

          <div className='fixed inset-0 z-10 overflow-y-auto'>
            <div className='flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              >
                <Dialog.Panel className='relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-sm sm:p-6'>
                  <div>
                    <div className='mx-auto flex max-h-16 max-w-[140px] items-center justify-center'>
                      <h2>{method ? 'Update Bill' : 'Add New Bill'}</h2>
                    </div>
                    <div className='mb-10 sm:mt-5'>
                      <div>
                        <label
                          htmlFor='first_name'
                          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                        >
                          Description
                        </label>
                        <input
                          type='text'
                          id='first_name'
                          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          placeholder='Description'
                          required
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                      <div className='my-2'>
                        <label
                          htmlFor='first_name'
                          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                        >
                          Category
                        </label>
                        <input
                          type='text'
                          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          placeholder='Category'
                          required
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor='first_name'
                          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                        >
                          Amount
                        </label>
                        <input
                          id='first_name'
                          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          placeholder='Amount'
                          required
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='text-center '>
                    <button
                      className='mr-5 py-2.5 px-5  mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center'
                      onClick={
                        method
                          ? () => {
                              const data = {
                                category,
                                description,
                                amount,
                                id,
                              };
                              dispatch(updateBill(data));
                              setOpen(false);
                              setCategory('');
                              setDescription('');
                              setAmount('');
                            }
                          : addBill
                      }
                    >
                      {method ? 'Update' : 'Create'} Bill
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Bills;
