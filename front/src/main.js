import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
 

const app = createApp(App)
import './plugins/axios'

import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faEyeSlash, faEye, faLock, faUser ,faCartShopping, faCartArrowDown, faHeart, faChevronLeft, faChevronRight, faFilter, faChevronDown, faChevronUp, faArrowRight, faXmarkCircle, faCaretUp, faCaretDown, faArrowLeft, faStar, faGear, faArrowRightFromBracket, faXmark, faCamera, faEnvelope, faX, faMagnifyingGlass, faBars, faTrash, faPlus, faMinus, faPhone, faCircleExclamation, faCreditCard, faBarcode, faMoneyBillTransfer, faCartPlus} from '@fortawesome/free-solid-svg-icons'

import { faFacebook, faInstagram, faTwitter, faYoutube, faPix} from '@fortawesome/free-brands-svg-icons'
/* add icons to the library */
library.add(faEyeSlash, faEye, faLock, faUser,  faCartShopping, faCartArrowDown, faHeart, faChevronLeft, faChevronRight, faFilter, faChevronDown, faChevronUp, faArrowRight, faXmarkCircle, faCaretUp, faCaretDown, faArrowLeft, faStar, faGear, faArrowRightFromBracket, faXmark, faCamera, faEnvelope, faX, faMagnifyingGlass, faBars, faTrash, faPlus, faMinus, faFacebook, faInstagram, faTwitter, faYoutube, faPhone, faCircleExclamation, faCreditCard, faBarcode, faPix, faMoneyBillTransfer, faCartPlus)


import VueAwesomePaginate from "vue-awesome-paginate";

import "vue-awesome-paginate/dist/style.css";


app.use(createPinia())
app.use(router)
app.use(VueAwesomePaginate)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
