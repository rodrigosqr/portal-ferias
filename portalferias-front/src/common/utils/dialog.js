import { Dialog } from 'quasar'

const createDialogButtons = (yesLbl, yesFn, noLbl, noFn) => {
  let buttonOptions = [[noLbl, noFn], [yesLbl, yesFn]]
  buttonOptions = buttonOptions.reduce((acc, curr) => {
    if (curr && curr.length && curr[0]) {
      const label = curr[0]
      const handler = curr.length > 1
        ? curr[1]
        : () => ({})
      acc.push({
        label,
        handler
      })
    }

    return acc
  }, [])

  let lastButton = buttonOptions[buttonOptions.length - 1]
  lastButton.raised = true
  lastButton.color = 'indigo'

  if (buttonOptions.length > 1) {
    let firstButton = buttonOptions[0]
    firstButton.outline = true
    firstButton.color = 'negative'
  }

  return buttonOptions
}

const createDialog = (title, message, yesLbl, yesFn, noLbl, noFn, noEscDismiss = true, noBackdropDismiss = true) => {
  const defaultDialog = {
    title,
    message,
    noEscDismiss,
    noBackdropDismiss
  }

  const buttons = {
    buttons: createDialogButtons(yesLbl, yesFn, noLbl, noFn)
  }

  Dialog.create(Object.assign({}, defaultDialog, buttons))

  document.body.style.paddingRight = 0
}

export default createDialog
