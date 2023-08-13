const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getCurrentUserById,
  updateProfileUser,
} = require('../controllers/users');
const authMiddleware = require('../middlewares/auth');

router.get('/me', authMiddleware, getCurrentUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), authMiddleware, updateProfileUser);

module.exports = router;
