const router = require('express').Router();
const {
    addThought,
    addReaction,
    removeReaction,
    removeThought
} = require('../../controllers/thought-controllers');

// /api/thoughts/<userId>
router.route('/:userId').post(addThought);

// /api/thoughts/<userId>/<thoughtId>
router.route('/:userId/:thoughtId').delete(removeThought);

router
    .route('/:users/:thoughtId')
    .put(addReaction);
    //.delete(removeThought); //same as above

router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;