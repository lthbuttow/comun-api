import jwt from 'jsonwebtoken';

import UserSchema from '../models/User';

import authConfig from '../../config/auth';

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

class UserController {
  async index(req, res) {
    try {
      const user = await UserSchema.find();
      if (!user) return res.status(400).send({ error: 'No users found' });

      return res.send({
        user,
      });
    } catch (error) {
      return res.status(400).send({ error: 'Query failed' });
    }
  }

  async show(req, res) {
    const { id } = req.params;

    try {
      const user = await UserSchema.findOne({ _id: id });

      if (!user) return res.status(400).send({ error: 'User not found' });

      return res.send({
        user,
      });
    } catch (error) {
      return res.status(400).send({ error: 'Query failed' });
    }
  }

  async store(req, res) {
    const { email, password } = req.body;

    try {
      if (password <= 5)
        return res
          .status(400)
          .send({ error: 'Password should contain more than 5 chars' });

      if (await UserSchema.findOne({ email }))
        return res.status(400).send({ error: 'User already exists' });

      const user = await UserSchema.create(req.body);

      const { name, admin } = user;

      return res.send({
        name,
        email,
        admin,
        token: generateToken({ id: user.id }),
      });
    } catch (error) {
      return res.status(400).send({ error: 'Insert failed' });
    }
  }

  async update(req, res) {
    const { id } = req.params;

    try {
      if (await UserSchema.findOne({ id }))
        return res.status(400).send({ error: 'User not found' });

      const user = await UserSchema.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      return res.send({
        user,
      });
    } catch (error) {
      return res.status(400).send({ error: 'Registration failed' });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      if (await UserSchema.findOne({ id }))
        return res.status(400).send({ error: 'User not found' });

      await UserSchema.findByIdAndDelete(id);

      return res.status(200).send({ msg: 'Success' });
    } catch (error) {
      return res.status(400).send({ error: 'Operation Failed' });
    }
  }
}

export default new UserController();
