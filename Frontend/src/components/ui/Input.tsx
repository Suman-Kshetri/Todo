
import React from 'react';

type InputProps = {
    label: string,
    type?: string,
    error?:string,
    className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>

const Input:React.FC<InputProps> = ({label,type = "text", error, className, ...props}) => {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-semibold">{label}</label>
      <input
        type={type}
        {...props} // <- Spread all additional props here
        className={`w-full p-2 border border-gray-300 rounded ${className}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}

export default Input
