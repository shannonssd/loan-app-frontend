import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'
import NewLoanView from "../components/NewLoanView.vue"
import EditLoanView from "../components/EditLoanView.vue"
import LoanDetailsView from "../components/LoanDetailsView.vue"
import AdvancedSearchView from "../components/AdvancedSearchView.vue"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/new-loan',
    name: 'new form',
    component: NewLoanView
  },
  {
    path: '/edit-loan/:id',
    name: 'edit form',
    component: EditLoanView
  },
  {
    path: '/loan-details/:id',
    name: 'loan details',
    component: LoanDetailsView
  },
  {
    path: '/advanced-search',
    name: 'advanced search',
    component: AdvancedSearchView
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
