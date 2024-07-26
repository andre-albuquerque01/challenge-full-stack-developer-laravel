interface InputProps {
  type: string
  label: string
  id: string
  name: string
  required: boolean
  placeHolder?: string
  value?: string | number
}

export const InputUpdatePatterComponent = ({ ...props }: InputProps) => {
  return (
    <div className="flex items-center h-10 border border-zinc-300 rounded-r-md">
      <label
        htmlFor={props.id}
        className="border h-full w-[20%] flex items-center bg-zinc-200 px-4 font-semibold"
      >
        {props.label}{' '}
        {props.required && <span className="text-xs text-red-600"> *</span>}
      </label>
      <input
        type={props.type}
        name={props.name}
        id={props.id}
        placeholder={props.placeHolder}
        className="flex-1 p-4 bg-transparent text-sm h-10 outline-none placeholder:text-zinc-500 focus-within:outline-none"
        required={props.required}
        defaultValue={props.value}
      />
    </div>
  )
}
