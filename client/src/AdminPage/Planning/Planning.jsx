import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

export default function Planning() {

	const [customer, setCustomer] = useState(null)
	const [rowData, setRowData] = useState()
	const gridRef = useRef()

	useEffect(() => {
		const getrowsData = async () => {
			try {
				const response = await fetch('http://localhost:3000/api/customers/all', {
					method: 'GET',
					headers: { 'x-access-token': '' }
				});
				if (response.ok) {
					const data = await response.json()
					setRowData(data)
				};
			} catch (error) {
				console.log(error)
			}
		};
		getrowsData()
	}, [])


	const onCellValueChanged = useCallback(async (params) => {
		// Extrait les données de la ligne modifiée
		console.log(params)
		const updatedCustomerData = params.data;
		const customerId = updatedCustomerData.id
		console.log('id', customerId)
		console.log('data : ', updatedCustomerData)
		try {
			const response = await fetch(`http://localhost:3000/api/customers/${customerId}`, {
				method: 'PUT',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(updatedCustomerData)
			});
			if (response.ok) {
				const data = await response.json()
				setCustomer(data)
				console.log('modification effectuée : ', data)
			}
		} catch (error) {
			console.log(error)
		}
	}, []);

	// const ColourCellRenderer = props => <span style={{color:'blue'}}>{props.value}</span>;
	// { field: 'phoneNumber1', headerName: 'Téléphone1', cellRenderer:ColourCellRenderer },

	const [columnDefs, setColumnDefs] = useState([
		{ field: 'firstName1', filter: true, pinned: 'left', lockPinned: true },
		{ field: 'lastName1', headerName: 'Nom1' },
		{ field: 'mail1', headerName: 'Email1' },
		{ field: 'phoneNumber1', headerName: 'Téléphone1' },
		{
			valueSetter: params => {
				params.data.contracts[0].validateDate = params.newValue;
				return true;
			},
			headerName: 'Date',
			valueGetter: 'data.contracts[0].validateDate',
			cellRenderer: (params) => moment(params.value).format('DD/MM/YYYY')
		},
		{
			valueSetter: params => {
				params.data.contracts[0].deadlineTotal = params.newValue;
				return true;
			},
			headerName: 'Solde dû le',
			valueGetter: 'data.contracts[0].deadlineTotal',
			cellRenderer: (params) => moment(params.value).format('DD/MM/YYYY')
		},
		{
			valueSetter: params => {
				params.data.contracts[0].deposit = params.newValue;
				return true;
			},
			headerName: 'Acompte',
			valueGetter: 'data.contracts[0].deposit'
		},
		{
			valueSetter: params => {
				params.data.contracts[0].balance = params.newValue;
				return true;
			},
			headerName: 'Solde',
			valueGetter: 'data.contracts[0].balance'
		},
		{
			valueSetter: params => {
				params.data.contracts[0].eventType = params.newValue;
				return true;
			},
			headerName: 'Type d\'événement',
			valueGetter: 'data.contracts[0].eventType'
		},
		{
			valueSetter: params => {
				params.data.contracts[0].note = params.newValue;
				return true;
			},
			headerName: 'Note',
			valueGetter: 'data.contracts[0].note'
		},
		{
			valueSetter: params => {
				params.data.contracts[0].reminderTotal = params.newValue;
				return true;
			},
			headerName: 'Demande de relance',
			valueGetter: 'data.contracts[0].reminderTotal'
		},
		{
			valueSetter: params => {
				params.data.contracts[0].invoiceTotalSent = params.newValue;
				return true;
			},
			headerName: 'Facture envoyée',
			valueGetter: 'data.contracts[0].invoiceTotalSent'
		},
		{
			valueSetter: params => {
				params.data.contracts[0].OpinionAsked = params.newValue;
				return true;
			},
			headerName: "Demande d'avis",
			valueGetter: 'data.contracts[0].OpinionAsked'
		}
	]);

	const defaultColDef = useMemo(() => ({
		sortable: true,
		editable: true
	}), []);


	return (

		<div className="isolate bg-white pt-10" style={{ height: 'calc(100vh - 8.5rem)' }}>
			<div className="max-w-2xl">
				<h2 className="text-2xl font-bold pl-6 tracking-tight text-gray-900 sm:text-4xl pb-8">Tableau client 📈</h2>
			</div>

			<div className='ag-theme-alpine' style={{ height: '100%' }}>
				<AgGridReact
					ref={gridRef}
					rowData={rowData}
					columnDefs={columnDefs}
					defaultColDef={defaultColDef}
					rowSelection='multiple'
					animateRows={true}
					onCellValueChanged={onCellValueChanged}

				/>
			</div>
		</div>
	)
}
