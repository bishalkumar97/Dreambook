import { toast } from 'sonner';

export const defaultMessage = (message) => {
    toast(`${message}`)
}
export const successMessage = (message) => {
    toast.success(`${message}`)
}
export const errorMessage = (message) => {
    toast.error(`${message}`)
}
export const infoMessage = (message) => {
    toast.info(`${message}`)
}
export const warningMessage = (message) => {
    toast.warning(`${message}`)
}
export const descriptionMessage = (message, description) => {
    toast.message(message, {
        description: description,
    })
}