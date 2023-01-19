import { ServiceCard } from '@/components/ServiceCard'

const services = [
  {
    name: 'Google',
    isFollowing: true,
    triggers: [
      {
        name: 'get an email',
        description: 'When you get an email',
        options: ['from', 'time', 'attachement'],
        outputs: ['time', 'attachement'],
      },
    ],
    reactions: [
      {
        name: 'get an email',
        description: 'When you get an email',
        options: ['from', 'time', 'attachement'],
      },
    ],
  },
  {
    name: 'Twitter',
    isFollowing: false,
    triggers: [
      {
        name: 'get an email',
        description: 'When you get an email',
        options: ['from', 'time', 'attachement'],
        outputs: ['time', 'attachement'],
      },
    ],
    reactions: [
      {
        name: 'get an email',
        description: 'When you get an email',
        options: ['from', 'time', 'attachement'],
      },
    ],
  },
  {
    name: 'Github',
    isFollowing: true,
    triggers: [
      {
        name: 'get an email',
        description: 'When you get an email',
        options: ['from', 'time', 'attachement'],
        outputs: ['time', 'attachement'],
      },
    ],
    reactions: [
      {
        name: 'get an email',
        description: 'When you get an email',
        arguments: ['from', 'time', 'attachement'],
      },
    ],
  },
  {
    name: 'Time',
    isFollowing: false,
    triggers: [
      {
        name: 'get an email',
        description: 'When you get an email',
        arguments: ['from', 'time', 'attachement'],
        outputs: ['time', 'attachement'],
      },
    ],
    reactions: [
      {
        name: 'get an email',
        description: 'When you get an email',
        arguments: ['from', 'time', 'attachement'],
      },
    ],
  },
]

const Services = () => {
  return (
    <div className="flex justify-between">
      <div className="w-1/2 p-32  space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Services</h1>
          <h2 className="text-xl font-bold">
            We offer a wide variety of services
          </h2>
        </div>
        <p className="text-lg w-2/3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          odio justo, eleifend vestibulum iaculis eget, ultrices ut dui. Etiam
          in ante ac magna lobortis placerat ac at eros. Nulla iaculis imperdiet
          augue nec auctor. Praesent posuere, orci in viverra eleifend, odio
          ante vehicula dui, et cursus nibh nulla nec erat. In commodo
          scelerisque mauris nec ultricies.
        </p>{' '}
      </div>
      <div className="w-1/2 py-32 bg-primary-900 flex flex-col space-y-8 items-center">
        {services.map((service) => {
          return (
            <ServiceCard
              name={service.name}
              isFollowing={service.isFollowing}
              triggers={service.triggers}
              reactions={service.reactions}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Services
