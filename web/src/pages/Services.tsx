import { ServiceCard } from '@/components/ServiceCard'
import { useGetServicesQuery } from '../redux/services/service'

const Services = () => {
  const services = useGetServicesQuery()

  return (
    <div className="flex justify-between">
      <div className="w-1/2 space-y-12  p-32">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Services</h1>
          <h2 className="text-xl font-bold">
            We offer a wide variety of services
          </h2>
        </div>
        <p className="w-2/3 text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          odio justo, eleifend vestibulum iaculis eget, ultrices ut dui. Etiam
          in ante ac magna lobortis placerat ac at eros. Nulla iaculis imperdiet
          augue nec auctor. Praesent posuere, orci in viverra eleifend, odio
          ante vehicula dui, et cursus nibh nulla nec erat. In commodo
          scelerisque mauris nec ultricies.
        </p>{' '}
      </div>
      <div className="bg-primary-900 flex w-1/2 flex-col items-center space-y-8 py-32">
        {services.isLoading ? (
          <h1> Is loading...</h1>
        ) : (
          services.data?.map((service) => {
            return (
              <ServiceCard
                key={service.id}
                id={service.id || 0}
                name={service.name}
                isFollowing={service.subscribed || false}
                triggers={service.triggers || []}
                reactions={service.reactions || []}
              />
            )
          })
        )}
      </div>
    </div>
  )
}

export default Services
