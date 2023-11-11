import { createStore } from "vuex";
import Users from './modules/users'
import Roles from './modules/roles'
import Patients from './modules/patients';
import Address from './modules/address'
import Disease from './modules/diease'
import RotaVirus from './modules/rota'
import Meningitis from './modules/meningitis'
import Measles from './modules/measles'

const store = createStore({
    modules: {
        Users,
        Roles,
        Patients,
        Address,
        Disease,
        RotaVirus,
        Meningitis,
        Measles
    }
})

export default store;