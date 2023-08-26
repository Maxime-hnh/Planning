import React, { useLayoutEffect, useRef, useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup';
//import moment from 'moment';
import { useLocation } from 'react-router';
import { MyTextInput } from '../../Components/Hooks/GenericInput';
import { MySelect } from '../../Components/Hooks/GenericSelect';
import { UserIcon, CalendarDaysIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid'
import { Background } from '../../Components/Hooks/Background';
import { toastError, toastInfo } from '../../Components/Hooks/Toast';
import { gsap } from "gsap";


export default function FormPage() {

	const boxRef = useRef()
	const subTitle = useRef()

	useLayoutEffect(() => {
		gsap.fromTo(boxRef.current, { y: -150, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power4.out' })
		gsap.fromTo(subTitle.current, { y: +100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.3, ease: 'power4.out' })
	})

	const [isLoading, setIsLoading] = useState(false)
	const [customer, setCustomer] = useState(null)

	const location = useLocation();
	let { customerId } = location.state || {}



	return (
		<>
			<div className="isolate bg-white px-6 py-10 sm:py-15 lg:px-8">

				<Background />
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl" ref={boxRef}>Formulaire client 🚀</h2>
					<p className="mt-2 text-lg leading-8 text-gray-600" ref={subTitle}>
						Le premier d'une longue série, alors au travail Steven !
					</p>
				</div>

				<Formik

					initialValues={customer || {
						firstName1: '',
						lastName1: '',
						phoneNumber1: '',
						mail1: '',
						firstName2: '',
						lastName2: '',
						phoneNumber2: '',
						mail2: '',
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
					validationSchema={Yup.object({
						firstName1: Yup.string()
							.required("Veuillez renseigner le prénom."),
						lastName1: Yup.string()
							.required("Veuillez renseigner le nom."),
						mail1: Yup.string()
							.required("Veuillez renseigner l'adresse mail."),
						phoneNumber1: Yup.string()
							.max(10, '10 caractères maximum')
							.required("Veuillez renseigner le numéro de téléphone."),
						firstName2: Yup.string()
							.required("Veuillez renseigner le prénom."),
						lastName2: Yup.string()
							.required("Veuillez renseigner le nom."),
						mail2: Yup.string()
							.required("Veuillez renseigner l'adresse mail."),
						phoneNumber2: Yup.string()
							.max(10, '10 caractères maximum')
							.required("Veuillez renseigner le numéro de téléphone."),

						knownFrom: Yup.string()
							.oneOf(
								[
									'Bouche à oreil',
									'Evènement au chateau',
									'Facebook',
									'Mariage.net',
									'Autre',
								]),
						hasApproved: Yup.boolean()
						.required('Veuillez sélectionner une réponse'),
						contract: Yup.object({
							eventType: Yup.string()
								.oneOf(
									[
										'🎂 Anniversaire',
										'⛪ Baptême',
										'💍 Mariage',
										'🍷 Vin d\'honneur',
										'Autre',
									]
								)
								.required('Veuillez sélectionner un type d\'évènement.'),

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
						try {
							const response = await fetch('http://localhost:3000/api/customers', {
								method: 'POST',
								headers: {
									'Content-type': 'application/json',
									'x-access-token': '',
								},
								body: JSON.stringify(values)
							});
							if (response.ok) {
								const data = await response.json()
								setCustomer(data)
								console.log('Success : ', data)
								toastInfo(' Client ajouté ! 😁🚀');
								resetForm()
								window.scrollTo({ top: 0, behavior: 'smooth' });

							};
						} catch (error) {
							console.log(error)
							toastError('😓😓 Une erreur est survenue : ', error);
						};
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
										id="mail1"
										name="mail1"
										type="email"
									/>
								</div>
								<div>
									<MyTextInput
										label="Téléphone"
										id="phoneNumber1"
										name="phoneNumber1"
										type="tel"
										pattern="[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}"
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
										id="mail2"
										name="mail2"
										type="email"
									/>
								</div>
								<div>
									<MyTextInput
										label="Téléphone"
										id="phoneNumber2"
										name="phoneNumber2"
										type="tel"
										pattern="[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}"
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
									<option value="🎂 Anniversaire">🎂 Anniversaire</option>
									<option value="⛪ Baptême">⛪ Baptême</option>
									<option value="💍 Mariage">💍 Mariage</option>
									<option value="🍷 Vin d'honneur">🍷 Vin d'honneur</option>
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
										label="Acompte"
										id="contract.deposit"
										name="contract.deposit"
										type="number"
									/>
								</div>
								<div>
									<MyTextInput
										label="Solde dû"
										id="contract.balance"
										name="contract.balance"
										type="number"

									/>
								</div>
							</div>
							<div className="sm:col-span-2 pb-6">
								<MyTextInput
									label="Prix total"
									id="contract.total"
									name="contract.total"
									type="number"
									value={formik.values.contract.deposit + formik.values.contract.balance}
								/>
							</div>
							<div className="sm:col-span-2 border-b border-gray-900/10 pb-8">
								<MyTextInput
									label="Note"
									id="contract.note"
									name="contract.note"
									as="textarea"
									rows={3}
								/>
							</div>
							{/* END CLIENT*/}

							<div className='flex items-center pt-4 mb-3'>
								<ChatBubbleLeftRightIcon className="h-8 w-8 pr-2 text-red-700" aria-hidden="true" />
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

							<div className="sm:col-span-2 border-b border-gray-900/10 pb-8">
								<h4 className="block text-l font-semibold leading-6 text-gray-900 text-center">Acceptez-vous que vos emails soient utilisés pour de la communication ?</h4>
								<div className='flex justify-center mt-4'>
									<label className="flex items-center mr-5">
										<input
											type="radio"
											className="h-5 w-5 text-indigo-600 border-gray-300 rounded"
											name="hasApproved"
											id="hasApproved"
											value={true}
											checked={formik.values.hasApproved === true}
											onChange={() => formik.setFieldValue('hasApproved', true)}
										/>
										<span className="text-sm font-semibold text-gray-900 pl-1">Oui</span>
									</label>
									<label className="flex items-center ml-5">
										<input
											type="radio"
											className="h-5 w-5 text-indigo-600 border-gray-300 rounded"
											name="hasApproved"
											id="hasApproved"
											value={false}
											checked={formik.values.hasApproved === false}
											onChange={() => formik.setFieldValue('hasApproved', false)}
										/>
										<span className="text-sm font-semibold text-gray-900 pl-1">Non</span>
									</label>
								</div>
							</div>


							<div className='flex justify-center mt-10'>
								<button
									type='submit'
									className=' bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded text-xl mr-4'
								>
									Confirmer
								</button>
								<button
									type='submit'
									className=' bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded text-xl'
								>
									Annuler
								</button>
							</div>
						</Form>
					)}
				</Formik >
			</div>
		</>
	)
}
