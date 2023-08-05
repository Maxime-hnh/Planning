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
                    const comparison = a[selecTedColumn].localeCompare(b[selecTedColumn]);
                    return sortDirection === 'asc' ? comparison : -comparison;
                }
                return 0;
            });
        }
        return null;
    }, [customers, selecTedColumn, sortDirection]);



    return (
        <>
            <div className="isolate bg-white px-6 py-10 sm:py-15">
                <div className="max-w-2xl">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl pb-8">Tableau client 📈</h2>
                </div>
                <table className='table-auto border-collapse border border-slate-400 w-full'>

                    <thead>
                        <tr>
                            <th className='border border-slate-300'>
                                <button onClick={() => sortBy('firstName1')}>Prénom</button>
                                {selecTedColumn === 'firstName1' && <span>{sortDirection === 'asc' ? '⬇️' : '⬆️'}</span>}
                            </th>
                            <th className='border border-slate-300'>
                                <button onClick={() => sortBy('lastName1')}>Nom</button>
                                {selecTedColumn === 'lastName1' && <span>{sortDirection === 'asc' ? '⬇️' : '⬆️'}</span>}
                            </th>
                            <th className='border border-slate-300'>
                                <button onClick={() => sortBy('email1')}>Email</button>
                                {selecTedColumn === 'email1' && <span>{sortDirection === 'asc' ? '⬇️' : '⬆️'}</span>}
                            </th>
                            <th className='border border-slate-300'>
                                <button onClick={() => sortBy('phoneNumber1')}>Téléphone</button>
                                {selecTedColumn === 'phoneNumber1' && <span>{sortDirection === 'asc' ? '⬇️' : '⬆️'}</span>}
                            </th>
                            <th className='border border-slate-300'>
                                <button onClick={() => sortBy('opinionAsked')}>Avis demandé</button>
                                {selecTedColumn === 'opinionAsked' && <span>{sortDirection === 'asc' ? '⬇️' : '⬆️'}</span>}
                            </th>
                            <th className='border border-slate-300'>
                                <button onClick={() => sortBy('validateDate')}>Date</button>
                                {selecTedColumn === 'validateDate' && <span>{sortDirection === 'asc' ? '⬇️' : '⬆️'}</span>}
                            </th>
                            <th className='border border-slate-300'>
                                <button onClick={() => sortBy('deadlineTotal')}>Solde dû le</button>
                                {selecTedColumn === 'deadlineTotal' && <span>{sortDirection === 'asc' ? '⬇️' : '⬆️'}</span>}
                            </th>
                            <th className='border border-slate-300'>
                                <button onClick={() => sortBy('deposit')}>Acompte</button>
                                {selecTedColumn === 'deposit' && <span>{sortDirection === 'asc' ? '⬇️' : '⬆️'}</span>}
                            </th>
                            <th className='border border-slate-300'>Solde</th>
                            <th className='border border-slate-300'>Relance à faire</th>
                            <th className='border border-slate-300'>Type d'évènement</th>
                            <th className='border border-slate-300'>Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers && (sortedCustomers.map((customer => (
                            <tr key={customer.id}>
                                <td className='border border-slate-300'>{customer.firstName1}</td>
                                <td className='border border-slate-300'>{customer.lastName1}</td>
                                <td className='border border-slate-300'>{customer.email1}</td>
                                <td className='border border-slate-300'>{customer.phoneNumber1}</td>
                                <td className='border border-slate-300'>{customer.opinionAsked}</td>
                                <td className='border border-slate-300'>{moment(customer.contracts[0].validateDate).locale('fr').format('DD-MM-YYYY')}</td>
                                <td className='border border-slate-300'>{moment(customer.contracts[0].deadlineTotal).locale('fr').format('DD-MM-YYYY')}</td>
                                <td className='border border-slate-300'>{customer.contracts[0].deposit}</td>
                                <td className='border border-slate-300'>{customer.contracts[0].balance}</td>
                                <td className='border border-slate-300'>{customer.contracts[0].reminderTotal}</td>
                                <td className='border border-slate-300'>{customer.contracts[0].eventType}</td>
                                <td className='border border-slate-300'>{customer.contracts[0].note}</td>
                            </tr>
                        ))))}
                    </tbody>
                </table>
            </div >

        </>
    )
}
