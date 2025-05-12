import { Question } from '#generated/prisma/index.js'
import prisma from '#prisma.js'
import { Request, Response, Router } from 'express'

const router = Router()

router.get('/question', async (_: Request, res: Response) => {
  const questions = await prisma.question.findMany()

  if (questions.length === 0) {
    res.status(404).json({ message: 'No questions found' })
    return
  }

  res.status(200).json(questions)
})

router.get('/question/:id', async (req: Request, res: Response) => {
  const question = await prisma.question.findUnique({
    where: {
      id: req.params.id
    }
  })

  if (!question) {
    res.status(404).json({ message: 'Question not found' })
    return
  }

  res.status(200).json(question)
})

router.post('/question', async (req: Request, res: Response) => {
  const { description, header, quiz_id } = req.body as Question

  if (!quiz_id || !header) {
    res.status(400).json({ message: 'Missing required fields' })
    return
  }

  const question = await prisma.question.create({
    data: {
      description,
      header,
      quiz_id
    }
  })

  res.status(201).json(question)
})

router.put('/question/:id', async (req: Request, res: Response) => {
  const { description, header, quiz_id } = req.body as Question

  const question = await prisma.question.update({
    data: {
      description,
      header,
      quiz_id
    },
    where: {
      id: req.params.id
    }
  })

  res.status(200).json(question)
})

router.delete('/question/:id', async (req: Request, res: Response) => {
  const question = await prisma.question.findUnique({
    where: {
      id: req.params.id
    }
  })

  if (!question) {
    res.status(404).json({ message: 'Question not found' })
    return
  }

  const deletedQuestion = await prisma.question.delete({
    where: {
      id: req.params.id
    }
  })

  res.status(200).json({
    deletedQuestion,
    message: 'Question deleted successfully'
  })
})

export default router
