import fastify from 'fastify'


export const app = fastify()

app
  .listen({
    port: 3338,
  })
  .then(() => {
    console.log('Server running 🚀')
  })
