import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Clients from '../views/Clients.vue';
import ClientCard from '../views/ClientCard';
import Expenses from '../views/Expenses.vue';
import Classes from '../views/Classes.vue';
import Passes from '../views/Passes.vue';
import Projects from '../views/Projects.vue';
import Analytics from '../views/Analytics.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/clients',
    name: 'Clients',
    component: Clients,
  },
  {
    path: '/clients/:id',
    name: 'ClientCard',
    component: ClientCard,
  },
  {
    path: '/expenses',
    name: 'Expenses',
    component: Expenses,
  },
  {
    path: '/classes',
    name: 'Classes',
    component: Classes,
  },
  {
    path: '/passes',
    name: 'Passes',
    component: Passes,
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects,
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: Analytics,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
