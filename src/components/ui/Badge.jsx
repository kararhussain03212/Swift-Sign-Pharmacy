import clsx from 'clsx'

const badgeConfig = {
  NEW:   { bg: 'bg-primary',       text: 'text-white' },
  SALE:  { bg: 'bg-red-500',       text: 'text-white' },
  HOT:   { bg: 'bg-orange-500',    text: 'text-white' },
  COMBO: { bg: 'bg-purple-500',    text: 'text-white' },
}

const Badge = ({ type }) => {
  const config = badgeConfig[type] || { bg: 'bg-gray-400', text: 'text-white' }
  return (
    <span
      className={clsx(
        'inline-block text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider',
        config.bg,
        config.text
      )}
    >
      {type}
    </span>
  )
}

export default Badge
