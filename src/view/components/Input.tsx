import { ComponentProps, forwardRef } from "react";

interface InputProps extends ComponentProps<'input'>{
  name: string;
}

//Input is a component, then it needs a forwardRef
export const Input = forwardRef<HTMLInputElement, InputProps>(({ placeholder, id, name, ...props}, ref) => {
  const inputId = id ?? name

  return (
    <div className="relative">
      <input
      name={name}
      id={inputId}
      ref={ref}
      className="bg-white rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 w-full pt-4 peer placeholder-shown:pt-0 focus:border-gray-800
      transition-all outline-none"
      placeholder=" "
      {...props}
    />
    <label
      htmlFor={inputId}
      className="absolute text-xs left-[13px] top-2 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5
      transition-all"
      >
        {placeholder}
    </label>
    </div>
  )
})
