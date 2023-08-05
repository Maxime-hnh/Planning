import React from 'react';
import { useField } from 'formik';

const MyCheckbox = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const errorClass = meta.touched && meta.error ? 'ring-red-700' : 'ring-indigo-600';

  return (
    <div className="mt-2.5 pr-2.5">
      <label htmlFor={props.id} className="flex items-center">
        <input
          type="checkbox"
          className={`h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-offset-0 focus:ring-opacity-50 ${errorClass}`}
          {...field}
          {...props}
        />
        <span className="ml-2 text-sm font-semibold text-gray-900">{label}</span>
      </label>
      {meta.touched && meta.error ? (
        <div className="text-red-700 text-sm">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MyCheckbox;






