import {Router as router} from 'express'
import actions from './actions'

const {
    create
} = actions

export default function participantController() {
    const part = router()

    part.post('/create', create)

    return part
}