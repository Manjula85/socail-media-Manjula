const router = require('express').Router();
const {
    allThought,
    singleThoughtById,
    addThought,
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

// /api/thoughts/<userId>/<thoughtId>
router.route('/:userId/:thoughtId').delete(removeThought);

router
    .route('/:userId/:thoughtId')
    .put(addReaction)
    .delete(removeThought);

router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;