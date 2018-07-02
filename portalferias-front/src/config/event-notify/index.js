import { Notify } from 'quasar'

const warning = (message) => {
  Notify.create({
    color: 'orange', textColor: 'black', message, icon: 'thumb_up', position: 'bottom-left'
  })
}

const error = (message) => {
  Notify.create({
    color: 'negative', message, icon: 'report_problem', position: 'bottom-left'
  })
}

const success = (message) => {
  Notify.create({
    color: 'secondary', message, icon: 'tag_faces', position: 'bottom-left'
  })
}

export { warning, error, success }
