import log from '../../log';
import Particepent from '../../models/particepents'
import particepents from '../../models/particepents';

export default {
    create(req, res) {
        const body = req.body
        new Particepent({
            fullName: body.name,
            email: body.email
        })
        .save()
        .then(particepent => {
            res.json({
                succes: true,
                message: 'Your data has been saved',
                particepent
            })
        })
        .catch(err => {
            log.error({ err })
            res.json({message: 'An error occurred'})
        })

    }
}