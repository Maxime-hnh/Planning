import React, { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup';
import moment from 'moment';
import { useLocation } from 'react-router';
import { MyTextInput } from '../Hooks/GenericInput';
import { MySelect } from '../Hooks/GenericSelect';
import { UserIcon, CalendarDaysIcon, RocketLaunchIcon, RadioIcon } from '@heroicons/react/24/solid'
import { Background } from '../Hooks/Background';
import MyCheckbox from '../Hooks/GenericCheckbox';

export default function FormPage() {

	const [isLoading, setIsLoading] = useState(false)

	const location = useLocation();
	let { customer } = location.state || {}



	return (
		<>
			<div className="isolate bg-white px-6 py-10 sm:py-15 lg:px-8">

				<Background />
				<div className="mx-auto max-w-2xl text-center">
					<div className='flex items-center justify-center'>
						<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Formulaire client</h2>
						<RocketLaunchIcon className='h-8 w-8 ml-2' />
					</div>
					<p className="mt-2 text-lg leading-8 text-gray-600">
						Le premier d'une longue série, alors au travail Steven !
					</p>
				</div>

				<Formik

					initialValues={customer || {
						firstName1: '',
						lastName1: '',
						phoneNumber1: '',
						email1: '',
						firstName2: '',
						lastName2: '',
						phoneNumber2: '',
						email2: '',
						knownFrom: '',
						hasApproved: null,
						contract: {
							eventType: '',
							validateDate: '',
							total: 0,
							deposit: 0,
							balance: 0,
							deadlineTotal: '',
							note: '',

						}
					}
					}
					enableReinitialize={true}
					validationSchema={Yup.object({
						firstName1: Yup.string()
							.max(100, '100 caractères maximum')
							.required("Veuillez renseigner le prénom."),
						lasttName1: Yup.string()
							.max(100, '100 caractères maximum')
							.required("Veuillez renseigner le nom."),
						phoneNumber1: Yup.string()
							.max(15, '15 caractères maximum')
							.required("Veuillez renseigner le numéro de téléphone."),
						email1: Yup.string()
							.required("Veuillez renseigner l'adresse mail."),
						firstName2: Yup.string()
							.max(100, '100 caractères maximum')
							.required("Veuillez renseigner le prénom."),
						lasttName2: Yup.string()
							.max(100, '100 caractères maximum')
							.required("Veuillez renseigner le nom."),
						phoneNumber2: Yup.string()
							.max(15, '15 caractères maximum'),
						email2: Yup.string(),
						knownFrom: Yup.string()
							.oneOf(
								[
									'Facebook',
									'Instagram',
									'Youtube',
									'Bouche à oreil',
									'Salon',
									'Evènement',

								]),
						hasApproved: Yup.boolean(),
						contract: Yup.object({
							eventType: Yup.string()
								.oneOf(
									[
										'Anniversaire',
										'Baptême',
										'Mariage',
										'Vin d\'honneur',
										'Autre',
									]
								),
							validateDate: Yup.date(),
							total: Yup.number(),
							deposit: Yup.number(),
							balance: Yup.number(),
							deadlineTotal: Yup.date(),
							note: Yup.string()
						})
					})}
					onSubmit={async (values, { resetForm }) => {
						console.log('Les valeurs : ', values)

					}}
				>
					{formik => (

						<Form className="mx-auto mt-16 max-w-xl sm:mt-20">
							{/* START CUSTOMER */}
							<div className='flex items-center mb-3'>
								<UserIcon className="h-8 w-8 pr-2 text-indigo-600" aria-hidden="true" />
								<h3 className='text-xl font-bold tracking-tight text-gray-900 sm:text-2xl'>Information client 1 </h3>
							</div>
							<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 border-b border-gray-900/10 pb-8">
								<div>
									<MyTextInput
										label="Prénom"
										id="firstName1"
										name="firstName1"
										type="text"
									/>
								</div>
								<div>
									<MyTextInput
										label="Nom"
										id="lastName1"
										name="lastName1"
										type="text"
									/>

								</div>
								<div>
									<MyTextInput
										label="Email"
										id="email1"
										name="email1"
										type="text"
									/>
								</div>
								<div>
									<MyTextInput
										label="Téléphone"
										id="phoneNumber1"
										name="phoneNumber1"
										type="text"
									/>
								</div>
							</div>

							<div className='flex items-center pt-4 mb-3'>
								<UserIcon className="h-8 w-8 pr-2 text-red-700" aria-hidden="true" />
								<h3 className='text-xl font-bold tracking-tight text-gray-900 sm:text-2xl'>Information client 2</h3>
							</div>
							<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 border-b border-gray-900/10 pb-8">
								<div>
									<MyTextInput
										label="Prénom"
										id="firstName2"
										name="firstName2"
										type="text"
									/>
								</div>
								<div>
									<MyTextInput
										label="Nom"
										id="lastName2"
										name="lastName2"
										type="text"
									/>

								</div>
								<div>
									<MyTextInput
										label="Email"
										id="email2"
										name="email2"
										type="text"
									/>
								</div>
								<div>
									<MyTextInput
										label="Téléphone"
										id="phoneNumber2"
										name="phoneNumber2"
										type="text"
									/>
								</div>
							</div>
							{/* END CUSTOMER*/}

							{/* START EVENT*/}
							<div className='flex items-center pt-4 mb-3'>
								<CalendarDaysIcon className="h-8 w-8 pr-2 text-indigo-600" aria-hidden="true" />
								<h3 className='text-xl font-bold tracking-tight text-gray-900 sm:text-2xl'>Evénement</h3>
							</div>
							<div className="sm:col-span-2 pb-6">
								<MySelect
									label="Type d'évènement"
									id="contract.eventType"
									name="contract.eventType"
								>
									<option value="">Sélectionnez un type d'évènement</option>
									<option value="Anniversaire">Anniversaire</option>
									<option value="Baptême">Baptême</option>
									<option value="Mariage">Mariage</option>
									<option value="Vin d'honneur">Vin d'honneur</option>
									<option value="Autre">Autre</option>
								</MySelect>

							</div>
							<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 pb-8">
								<div>
									<MyTextInput
										label="Date de l'évènement"
										id="contract.validateDate"
										name="contract.validateDate"
										type="date"
									/>
								</div>
								<div>
									<MyTextInput
										label="Solde dû le"
										id="contract.deadlineTotal"
										name="contract.deadlineTotal"
										type="date"

									/>

								</div>
							</div>
							<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 pb-8">
								<div>
									<MyTextInput
										label="Prix total"
										id="contract.total"
										name="contract.total"
										type="number"
									/>
								</div>
								<div>
									<MyTextInput
										label="Acompte"
										id="contract.deposit"
										name="contract.deposit"
										type="number"
									/>
								</div>
							</div>
							<div className="sm:col-span-2 pb-6">
								<MyTextInput
									label="Solde dû"
									id="contract.balance"
									name="contract.balance"
									type="number"
									value={formik.values.contract.total - formik.values.contract.deposit}

								/>
							</div>
							<div className="sm:col-span-2 border-b border-gray-900/10 pb-8">
								<MyTextInput
									label="Note"
									id="note"
									name="note"
									type="textarea"
									rows={3}
								/>
							</div>
							{/* END CLIENT*/}

							<div className='flex items-center pt-4 mb-3'>
								<RadioIcon className="h-8 w-8 pr-2 text-red-700" aria-hidden="true" />
								<h3 className='text-xl font-bold tracking-tight text-gray-900 sm:text-2xl'>Média</h3>
							</div>
							<div className="sm:col-span-2 pb-6">
								<MySelect
									label="Comment nous ont-il connu ?"
									id="knownFrom"
									name="knownFrom"
								>
									<option value="">Sélectionnez une des possibilités</option>
									<option value="Bouche à oreil">Bouche à oreil</option>
									<option value="Evènement au chateau">Evènement au chateau</option>
									<option value="Facebook">Facebook</option>
									<option value="Mariage.net">Mariage.net</option>
									<option value="Autre">Autre</option>
								</MySelect>
							</div>

							<div className="sm:col-span-2 pb-6">
							<h4 className="block text-l font-semibold leading-6 text-gray-900 text-center">Acceptez-vous que vos emails soient utilisés pour de la communication ?</h4>
								<div className='flex justify-center mt-4'>
								<MyCheckbox
									label="Oui"
									id="hasApproved"
									name="hasApproved"
									value={true}
								/>
								<MyCheckbox
									label="Non"
									id="hasApproved"
									name="hasApproved"
									value={false}
								/>
								</div>
							</div>
						</Form>
					)}
				</Formik >
			</div>


		</>
	)
}
