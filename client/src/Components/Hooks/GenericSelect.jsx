import { useField } from "formik";

//SELECT COMPONENT
export const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    const errorClass = meta.touched && meta.error ? 'focus:ring-red-700' : 'focus:ring-indigo-600';

    return (
        <>
            <label htmlFor={props.id} className="block text-sm font-semibold leading-6 text-gray-900">{label}</label>
            <div className='mt-2.5'>
                <select
                    className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${errorClass} sm:text-sm sm:leading-6`}
                    {...field}
                    {...props}
                />
                {meta.touched && meta.error ? (<div className='text-red-700' style={{ position: 'absolute', margin: '0' }}>{meta.error}</div>) : null}
            </div>
        </>
    );
};
