import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import './Liste.css'

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

	const button = p => {
		return (
			<>
				<button onClick={onDeleteRow}>click me</button>
			</>
		)
	}

	const [columnDefs, setColumnDefs] = useState([
		{
			field: 'firstName1',
			headerName: 'Prénom1',
			cellDataType: 'text',
			filter: 'agTextColumnFilter',
			floatingFilter: true,
		},
		{
			field: 'lastName1',
			headerName: 'Nom1',
			cellDataType: 'text',
			filter: 'agTextColumnFilter',
			floatingFilter: true
		},
		{
			field: 'mail1',
			headerName: 'Email1',
			cellDataType: 'text',
			filter: 'agTextColumnFilter',
			floatingFilter: true
		},
		{
			field: 'phoneNumber1',
			headerName: 'Téléphone1',
			cellDataType: 'text',
			filter: 'agTextColumnFilter',
			floatingFilter: true
		},
		{
			valueSetter: params => {
				params.data.contracts[0].validateDate = params.newValue;
				return true;
			},
			headerName: 'Date évènement',
			valueGetter: 'data.contracts[0].validateDate',
			cellRenderer: (params) => moment(params.value).format('DD/MM/YYYY'),
			cellDataType: 'date',
			filter: 'agDateColumnFilter',
			filterParams: {
				comparator: function (filterDateValue, cellValue) {
					const dateMomentFormat = moment(cellValue).format('DD/MM/YYYY');
					const dateParts = dateMomentFormat.split("/");
					const cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
					if (filterDateValue.getTime() === cellDate.getTime()) {
						return 0;
					}
		
					if (cellDate < filterDateValue) {
						return -1;
					}
		
					if (cellDate > filterDateValue) {
						return 1;
					}
				},
			},
			floatingFilter: true,
			pinned: 'left',
			lockPinned: true
		},
		{
			valueSetter: params => {
				params.data.contracts[0].deadlineTotal = params.newValue;
				return true;
			},
			headerName: 'Solde dû le',
			valueGetter: 'data.contracts[0].deadlineTotal',
			cellRenderer: (params) => moment(params.value).format('DD/MM/YYYY'),
			cellDataType: 'date',
			filter: 'agDateColumnFilter',
			filterParams: {
				comparator: function (filterDateValue, cellValue) {
					const dateMomentFormat = moment(cellValue).format('DD/MM/YYYY');
					const dateParts = dateMomentFormat.split("/");
					const cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
					if (filterDateValue.getTime() === cellDate.getTime()) {
						return 0;
					}
		
					if (cellDate < filterDateValue) {
						return -1;
					}
		
					if (cellDate > filterDateValue) {
						return 1;
					}
				},
			},
			floatingFilter: true,
		},
		{
			valueSetter: params => {
				const oldDeposit = params.data.contracts[0].deposit;
				const newDeposit = params.newValue;
				const oldBalance = params.data.contracts[0].balance;

				params.data.contracts[0].deposit = newDeposit;
				params.data.contracts[0].balance = oldBalance - (newDeposit - oldDeposit);

				return true;
			},
			headerName: 'Acompte',
			valueGetter: 'data.contracts[0].deposit',
			cellDataType: 'number',
			maxWidth : 100
		},
		{
			valueSetter: params => {
				params.data.contracts[0].balance = params.newValue;
				return true;
			},
			headerName: 'Solde',
			valueGetter: 'data.contracts[0].balance',
			cellDataType: 'number',
			maxWidth : 100
		},
		{
			valueSetter: params => {
				params.data.contracts[0].eventType = params.newValue;
				return true;
			},
			headerName: 'Type d\'événement',
			valueGetter: 'data.contracts[0].eventType',
			cellDataType: 'text',
			cellEditor: 'agSelectCellEditor',
			cellEditorParams: {
				values: ['🎂 Anniversaire', '⛪ Baptême', '💍 Mariage', '🍷 Vin d\'honneur', 'Autre'],
			},
			filter: 'agTextColumnFilter',
			floatingFilter: true,
		},
		{
			valueSetter: params => {
				params.data.contracts[0].note = params.newValue;
				return true;
			},
			headerName: 'Note',
			valueGetter: 'data.contracts[0].note',
			cellDataType: 'text',
			cellEditor: 'agLargeTextCellEditor',
			cellEditorPopup: true,
			maxWidth : 150
		},
		{
			valueSetter: params => {
				params.data.contracts[0].reminderTotal = params.newValue;
				return true;
			},
			headerName: 'Demande relance',
			valueGetter: 'data.contracts[0].reminderTotal',
			cellEditor: 'agSelectCellEditor',
			cellDataType: 'boolean',
			maxWidth : 150,
			cellStyle: { display: 'flex', justifyContent :'center' }
		},
		{
			valueSetter: params => {
				params.data.contracts[0].invoiceTotalSent = params.newValue;
				return true;
			},
			headerName: 'Facture envoyée',
			valueGetter: 'data.contracts[0].invoiceTotalSent',
			cellDataType: 'boolean',
			maxWidth : 150,
			cellStyle: { display: 'flex', justifyContent :'center' }
		},
		{
			field: 'opinionAsked',
			headerName: "Demande d'avis",
			cellDataType: 'boolean',
			maxWidth : 150,
			cellStyle: { display: 'flex', justifyContent :'center' }
		},
	]);


	const defaultColDef = useMemo(() => ({
		sortable: true,
		editable: true,
		resizable : true,
		suppressMenu: true,
		maxWidth : 200,		
		cellStyle : {textAlign : 'center'}	
	}), []);


	//UPDATING CELL
	const onCellValueChanged = useCallback(async (params) => {
		const updatedCustomerData = params.data;
		const customerId = updatedCustomerData.id
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

	//DELETE 
	const onDeleteRow = useCallback(async (params) => {
		const selectedRowData = params.data;
		const customerId = selectedRowData.id;
		try {
			const response = await fetch(`http://localhost:3000/api/customers/${customerId}`, {
				method: 'DELETE',
				headers: {
					'Content-type': 'application/json',
				},
			})
			if (response.ok) {
				const data = await response.json();
				console.log('Suppression effectuée : ', data);

				setCustomer((prevData) => prevData.filter((customer) => customer.id !== customerId));
			}
		} catch (error) {
			console.log(error);
		}
	}, []);


	//COLOR CHANGE 
	const gridOptions = {
		getRowStyle: params => {
			if (params.data.opinionAsked) {
				return { backgroundColor: '#1e2761', color: 'white' };
			}
			if (params.data.contracts[0].invoiceTotalSent) {
				return { backgroundColor: '#7a2048', color: 'white' };
			}
			if (params.data.contracts[0].reminderTotal) {
				return { backgroundColor: '#408ec6', color: 'white' };
			}
		}
	};


	return (

		<div className="isolate bg-white pt-10" style={{ height: 'calc(100vh - 8.5rem)' }}>
			<div className="max-w-2xl">
				<h2 className="text-2xl font-bold pl-6 tracking-tight text-gray-900 sm:text-4xl pb-8">Liste client 📈</h2>
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
					gridOptions={gridOptions}
				/>
			</div>
		</div>
	)
};
