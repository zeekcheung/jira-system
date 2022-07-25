import { Rate } from 'antd'

interface IPin extends React.ComponentProps<typeof Rate> {
  checked: boolean
  onCheckedChange?: (pin: boolean) => void
}

export const Pin = ({ checked, onCheckedChange, ...restProps }: IPin) => {
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(value) => onCheckedChange?.(!!value)}
      {...restProps}
    />
  )
}
