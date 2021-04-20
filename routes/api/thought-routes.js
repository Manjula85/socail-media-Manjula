const router = require('express').Router();
const {
    allThought,
    singleThoughtById,
    addThought,
    updateThought,
    addReaction,
    removeReaction,
    removeThought
} = require('../../controllers/thought-controllers');

// /api/thoughts
router.route('/').get(allThought);

// /api/thoughts/<thoughtId>
router.route('/:thoughtId').get(singleThoughtById);

// /api/thoughts/<userId>
router.route('/:userId').post(addThought);

// /api/thoughts/<thoughtId>
router.route('/:thoughtId').put(updateThought);

// /api/thoughts/<userId>/<thoughtId>
router.route('/:userId/:thoughtId').delete(removeThought);

router
    .route('/:thoughtId')
    .put(addReaction)

router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;