import { useField } from "formik";


export const MyRadio = ({ label, options, ...props }) => {
    const [field, meta] = useField(props);
    const errorClass = meta.touched && meta.error ? 'ring-red-700' : 'ring-indigo-600';

    return (
        <div className="mt-2.5">
            <label className="block text-sm font-semibold leading-6 text-gray-900">{label}</label>
            <div className="flex space-x-4">
                {options.map((option, index) => (
                    <label key={index} className="flex items-center space-x-2">
                        <input
                            type="radio"
                            className={`h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-offset-0 focus:ring-opacity-50 ${errorClass}`}
                            {...field}
                            {...props}
                            value={option.value}
                            checked={field.value === option.value}
                        />
                        <span className="text-sm font-semibold text-gray-900">{option.label}</span>
                    </label>
                ))}
            </div>
            {meta.touched && meta.error ? (
                <div className="text-red-700 text-sm">{meta.error}</div>
            ) : null}
        </div>
    );
};

