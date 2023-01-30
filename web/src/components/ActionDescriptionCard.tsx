import { triggerProps } from '@/components/ServiceCard'

export const ActionDescriptionCard = ({
  name,
  description,
  options,
  outputs = [],
}: triggerProps) => {
  return (
    <div className="px-8 py-4 bg-white shadow-lg rounded-lg space-y-2">
      <h1 className="text-xl font-bold">{name}</h1>
      <h1 className="font-bold">
        Params:
        {options.map((option) => {
          return <span> {option},</span>
        })}
      </h1>
      {outputs.length > 0 && (
        <h1 className="font-bold">
          Outputs:
          {outputs.map((output) => {
            return <span> {output},</span>
          })}
        </h1>
      )}
      <p>{description}</p>
    </div>
  )
}
