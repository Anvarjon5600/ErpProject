export default async context => {
  document.addEventListener('DOMContentLoaded', async () => {
    await context.store.dispatch('nuxtClientInit', context)
  })
}
