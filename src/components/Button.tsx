type Props = {
  variant: 'primary' | 'secondary' | 'normal'
  onClick?: () => void
  disabled?: boolean
  children: React.ReactNode
  icon?: string
}
const Button = ({ variant, onClick, disabled, children, icon }: Props) => {
  const variants = {
    primary: 'bg-brand hover:bg-[#3C8EC4] active:bg-[#347CAB] text-white',
    secondary: 'border-2 border-brand bg-white text-brand hover:bg-[#CCCCCC] active:bg-[#B3B3B3]',
    normal: 'bg-btn-normal text-white hover:bg-[#999999] active:bg-[#808080]',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${variants[variant]} flex flex-col items-center justify-center w-[90px] h-10 rounded disabled:opacity-50 text-[10px] font-bold  transition-colors duration-300 cursor-pointer`}
    >
      {icon && <img src={icon} className="w-6 h-6" />}
      {children}
    </button>
  )
}

export default Button
