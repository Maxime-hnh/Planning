import React, { useEffect, useMemo, useState } from 'react';
import moment from 'moment';

export default function Table() {

    const [customers, setCustomers] = useState(null)
    useEffect(() => {
        const getCustomers = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/customers/all', {
                    method: 'GET',
                    headers: { 'x-access-token': '' }
                });
                if (response.ok) {
                    const data = await response.json()
                    setCustomers(data)
                    console.log('valeurs :', data)
                };
            } catch (error) {
                console.log(error)
            }
        };
        getCustomers()
    }, [])

    const [selecTedColumn, setSelecTedColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('desc');

    const sortBy = (column) => {
        setSelecTedColumn(column);
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };

    const sortedCustomers = useMemo(() => {
        if (customers) {
            return [...customers].sort((a, b) => {
                if (selecTedColumn) {
                    if (selecTedColumn === 'deposit') {
                        const comparison = a[selecTedColumn] - b[selecTedColumn];
                        return sortDirection === 'asc' ? comparison : -comparison;
                    } else if (selecTedColumn === 'validateDate') {
                        const dateA = new Date(a[selecTedColumn]);
                        const dateB = new Date(b[selecTedColumn]);
                        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
                    } else {
                        const comparison = a[selecTedColumn].localeCompare(b[selecTedColumn]);
                        return sortDirection === 'asc' ? comparison : -comparison;
                    }
                }
                return 0;
            });
        }
        return null;
    }, [customers, selecTedColumn, sortDirection]);


    return (
        <>
            <div className="isolate bg-white py-10 sm:py-15">
                <div className="max-w-2xl">
                    <h2 className="text-2xl font-bold pl-6 tracking-tight text-gray-900 sm:text-4xl pb-8">Tableau client 📈</h2>
                </div>

                <div className='overflow-x-auto rounded-lg'>
                    <table className='w-full'>

                        <thead>
                            <tr>
                                <th className='px-6 py-4  text-gray-800 tracking-wider'>
                                    <button onClick={() => sortBy('firstName1')} className='uppercase text-left text-md font-medium'>Prénom</button>
                                    {selecTedColumn === 'firstName1' && <span>{sortDirection === 'asc' ? '⬇️' : '⬆️'}</span>}
                                </th>
                                <th className=' border-l border-slate-400 px-6 py-4 font-medium text-gray-800 tracking-wider'>
                                    <button onClick={() => sortBy('lastName1')} className='uppercase text-left text-md font-medium'>Nom</button>
                                    {selecTedColumn === 'lastName1' && <span>{sortDirection === 'asc' ? '⬇️' : '⬆️'}</span>}
                                </th>
                                <th className=' border-l border-slate-400 px-6 py-4 font-medium text-gray-800 tracking-wider'>
                                    <button onClick={() => sortBy('email1')} className='uppercase text-left text-md font-medium'>Email</button>
                                    {selecTedColumn === 'email1' && <span>{sortDirection === 'asc' ? '⬇️' : '⬆️'}</span>}
                                </th>
                                <th className=' border-l border-slate-400 px-6 py-4 font-medium text-gray-800 tracking-wider'>
                                    <button onClick={() => sortBy('phoneNumber1')} className='uppercase text-left text-md font-medium'>Téléphone</button>
                                    {selecTedColumn === 'phoneNumber1' && <span>{sortDirection === 'asc' ? '⬇️' : '⬆️'}</span>}
                                </th>
                                <th className=' border-l border-slate-400 px-6 py-4 font-medium text-gray-800 tracking-wider'>
                                    <button onClick={() => sortBy('opinionAsked')} className='uppercase text-left text-md font-medium'>Avis demandé</button>
                                    {selecTedColumn === 'opinionAsked' && <span>{sortDirection === 'asc' ? '⬇️' : '⬆️'}</span>}
                                </th>
                                <th className=' border-l border-slate-400 px-6 py-4 font-medium text-gray-800 tracking-wider'>
                                    <button onClick={() => sortBy('validateDate')} className='uppercase text-left text-md font-medium'>Date</button>
                                    {selecTedColumn === 'validateDate' && <span>{sortDirection === 'asc' ? '⬇️' : '⬆️'}</span>}
                                </th>
                                <th className=' border-l border-slate-400 px-6 py-4 font-medium text-gray-800 tracking-wider'>
                                    <button onClick={() => sortBy('deadlineTotal')} className='uppercase text-left text-md font-medium'>Solde dû le</button>
                                    {selecTedColumn === 'deadlineTotal' && <span>{sortDirection === 'asc' ? '⬇️' : '⬆️'}</span>}
                                </th>
                                <th className=' border-l border-slate-400 px-6 py-4 font-medium text-gray-800 tracking-wider'>
                                    <button onClick={() => sortBy('deposit')} className='uppercase text-left text-md font-medium'>Acompte</button>
                                    {selecTedColumn === 'deposit' && <span>{sortDirection === 'asc' ? '⬇️' : '⬆️'}</span>}
                                </th>
                                <th className=' border-l border-slate-400 px-6 py-4 font-medium text-gray-800 tracking-wider'>
                                    <button onClick={() => sortBy('balance')} className='uppercase text-left text-md font-medium'>Solde</button>
                                    {selecTedColumn === 'balance' && <span>{sortDirection === 'asc' ? '⬇️' : '⬆️'}</span>}
                                </th>
                                <th className=' border-l border-slate-400 px-6 py-4 font-medium text-gray-800 tracking-wider'>
                                    <button onClick={() => sortBy('reminderTotal')} className='uppercase text-left text-md font-medium'>Relance à faire</button>
                                    {selecTedColumn === 'reminderTotal' && <span>{sortDirection === 'asc' ? '⬇️' : '⬆️'}</span>}
                                </th>
                                <th className=' border-l border-slate-400 px-6 py-4 font-medium text-gray-800 tracking-wider'>
                                    <button onClick={() => sortBy('eventType')} className='uppercase text-left text-md font-medium'>Type d'évènement</button>
                                    {selecTedColumn === 'eventType' && <span>{sortDirection === 'asc' ? '⬇️' : '⬆️'}</span>}
                                </th>
                                <th className=' border-l border-slate-400 px-6 py-4 font-medium text-gray-800 tracking-wider'>
                                    <button onClick={() => sortBy('note')} className='uppercase text-left text-md font-medium'>Note</button>
                                    {selecTedColumn === 'note' && <span>{sortDirection === 'asc' ? '⬇️' : '⬆️'}</span>}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers && (sortedCustomers.map((customer, index) => (
                                <tr className={index % 2 === 0 ? 'bg-gray-100' : ''} key={customer.id}>
                                    <td className='px-6 py-4 whitespace-nowrap text-lg text-gray-800'>{customer.firstName1}</td>
                                    <td className='border-l border-slate-400 px-6 py-4 whitespace-nowrap text-lg text-gray-800'>{customer.lastName1}</td>
                                    <td className='border-l border-slate-400 px-6 py-4 whitespace-nowrap text-lg text-gray-800'>{customer.email1}</td>
                                    <td className='border-l border-slate-400 px-6 py-4 whitespace-nowrap text-lg text-gray-800'>{customer.phoneNumber1}</td>
                                    <td className='border-l border-slate-400 px-6 py-4 whitespace-nowrap text-lg text-gray-800'>{customer.opinionAsked}</td>
                                    <td className='border-l border-slate-400 px-6 py-4 whitespace-nowrap text-lg text-gray-800'>{moment(customer.contracts[0].validateDate).locale('fr').format('DD-MM-YYYY')}</td>
                                    <td className='border-l border-slate-400 px-6 py-4 whitespace-nowrap text-lg text-gray-800'>{moment(customer.contracts[0].deadlineTotal).locale('fr').format('DD-MM-YYYY')}</td>
                                    <td className='border-l border-slate-400 px-6 py-4 whitespace-nowrap text-lg text-gray-800'>{customer.contracts[0].deposit}</td>
                                    <td className='border-l border-slate-400 px-6 py-4 whitespace-nowrap text-lg text-gray-800'>{customer.contracts[0].balance}</td>
                                    <td className='border-l border-slate-400 px-6 py-4 whitespace-nowrap text-lg text-gray-800'>{customer.contracts[0].reminderTotal}</td>
                                    <td className='border-l border-slate-400 px-6 py-4 whitespace-nowrap text-lg text-gray-800'>{customer.contracts[0].eventType}</td>
                                    <td className='border-l border-slate-400 px-6 py-4 whitespace-nowrap text-lg text-gray-800'>{customer.contracts[0].note}</td>
                                </tr>
                            )))}
                        </tbody>
                    </table>
                </div>
            </div >

        </>
    )
}
