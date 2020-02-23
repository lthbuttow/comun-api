import QuestionSchema from '../models/Question';

class QuestionController {
  async index(req, res) {
    try {
      const question = await QuestionSchema.find();
      if (!question)
        return res.status(400).send({ error: 'No questions found' });

      return res.send({
        question,
      });
    } catch (error) {
      return res.status(400).send({ error: 'Query failed' });
    }
  }

  async show(req, res) {
    const { id } = req.params;

    try {
      const question = await QuestionSchema.findOne({ _id: id });

      if (!question)
        return res.status(400).send({ error: 'Question not found' });

      return res.send({
        question,
      });
    } catch (error) {
      return res.status(400).send({ error: 'Query failed' });
    }
  }

  async store(req, res) {
    const { message } = req.body;
    try {
      if (message.length <= 10) {
        return res
          .status(400)
          .send({ error: 'Message should contain more than 5 chars' });
      }

      const question = await QuestionSchema.create(req.body);

      const { email, checked, createdAt } = question;

      return res.send({
        email,
        message,
        checked,
        createdAt,
      });
    } catch (error) {
      return res.status(400).send({ error: 'Insert message failed' });
    }
  }

  async update(req, res) {
    const { id } = req.params;

    try {
      if (await QuestionSchema.findOne({ id }))
        return res.status(400).send({ error: 'Question not found' });

      const question = await QuestionSchema.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      return res.send({
        question,
      });
    } catch (error) {
      return res.status(400).send({ error: 'Update failed' });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      if (await QuestionSchema.findOne({ id }))
        return res.status(400).send({ error: 'Question not found' });

      await QuestionSchema.findByIdAndDelete(id);

      return res.status(200).send({ msg: 'Success' });
    } catch (error) {
      return res.status(400).send({ error: 'Operation Failed' });
    }
  }
}

export default new QuestionController();
