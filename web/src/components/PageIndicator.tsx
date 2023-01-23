import { ReactElement } from 'react'
import { RiCheckboxBlankCircleFill } from 'react-icons/ri'

export type PageIndicatorProps = {
  pages: number
  current: number
}

export const PageIndicator = ({ pages, current }: PageIndicatorProps) => {
  const items: ReactElement[] = []
  for (let i = 0; i < pages; i += 1) {
    if (i < current)
      items.push(<RiCheckboxBlankCircleFill className="text-primary" />)
    else items.push(<RiCheckboxBlankCircleFill className="text-gray-400" />)
  }

  return <div className="flex items-center space-x-1">{items}</div>
}
