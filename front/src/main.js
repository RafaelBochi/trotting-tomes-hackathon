import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
import './plugins/axios'

import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faEyeSlash, faEye, faLock, faUser, faCartShopping, faCartArrowDown, faHeart, faChevronLeft, faChevronRight, faFilter, faChevronDown, faChevronUp, faArrowRight, faXmarkCircle, faCaretUp, faCaretDown, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faEyeSlash, faEye, faLock, faUser, faCartShopping, faCartArrowDown, faHeart, faChevronLeft, faChevronRight, faFilter, faChevronDown, faChevronUp, faArrowRight, faXmarkCircle, faCaretUp, faCaretDown, faArrowLeft )

import VueAwesomePaginate from "vue-awesome-paginate";

import "vue-awesome-paginate/dist/style.css";

app.use(createPinia())
app.use(router)
app.use(VueAwesomePaginate)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
