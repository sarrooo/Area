export type ActionDescriptionCardProps = {
  name: string
  description: string
  inputs?: string[]
  outputs?: string[]
}

export const ActionDescriptionCard = ({
  name,
  description,
  inputs,
  outputs = [],
}: ActionDescriptionCardProps) => {
  return (
    <div className="space-y-2 rounded-lg bg-white px-8 py-4 shadow-lg">
      <h1 className="text-xl font-bold">{name}</h1>
      <h1 className="font-bold">
        Inputs:&nbsp;
        {inputs?.map((input, index) => {
          return (
            <span key={input}>
              {index !== 0 ? ', ' : ''}
              {input.split('.')[1]}
            </span>
          )
        })}
      </h1>
      {outputs.length > 0 && (
        <h1 className="font-bold">
          Outputs:&nbsp;
          {outputs.map((output, index) => {
            return (
              <span key={output}>
                {index !== 0 ? ', ' : ''}
                {output.split('.')[1]}
              </span>
            )
          })}
        </h1>
      )}
      <p>{description}</p>
    </div>
  )
}
