import { triggerProps } from '@/components/ServiceCard'

export const ActionDescriptionCard = ({
  name,
  description,
  options,
  outputs = [],
}: triggerProps) => {
  return (
    <div className="space-y-2 rounded-lg bg-white px-8 py-4 shadow-lg">
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
