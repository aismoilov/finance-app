export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    const token = localStorage.getItem('token');
    const isAuthPage = to.path === '/login' || to.path === '/register';

    if (!token && !isAuthPage && to.path !== '/') {
      return navigateTo('/login');
    }

    if (token && isAuthPage) {
      return navigateTo('/dashboard/finances');
    }
  }
});
