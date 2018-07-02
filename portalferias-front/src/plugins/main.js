import VeeValidate from 'vee-validate'
import * as EventNotify from 'src/config/event-notify'
import { vPattern } from 'src/common/directives/mask'

export default ({ Vue }) => {
  Vue.use(VeeValidate)
  Vue.directive('pattern', vPattern)
  Vue.prototype.message = EventNotify
}
