import { Type } from '#generated/prisma/index.js'
import prisma from '#prisma.js'
import { Request, Response, Router } from 'express'

const router = Router()

router.get('/type', async (_: Request, res: Response) => {
  const types = await prisma.type.findMany()

  if (types.length === 0) {
    res.status(404).json({ message: 'No question types found' })
    return
  }

  res.status(200).json(types)
})

router.get('/type/:id', async (req: Request, res: Response) => {
  const type = await prisma.type.findUnique({
    where: {
      id: req.params.id
    }
  })

  if (!type) {
    res.status(404).json({ message: 'Question type not found' })
    return
  }

  res.status(200).json(type)
})

router.post('/type', async (req: Request, res: Response) => {
  const { description, question_id } = req.body as Type

  if (!question_id || !description) {
    res.status(400).json({ message: 'Missing required fields' })
    return
  }

  const type = await prisma.type.create({
    data: {
      description,
      question_id
    }
  })

  res.status(201).json(type)
})

router.put('/type/:id', async (req: Request, res: Response) => {
  const { description, question_id } = req.body as Type

  const type = await prisma.type.update({
    data: {
      description,
      question_id
    },
    where: {
      id: req.params.id
    }
  })

  res.status(200).json(type)
})

router.delete('/type/:id', async (req: Request, res: Response) => {
  const type = await prisma.type.findUnique({
    where: {
      id: req.params.id
    }
  })

  if (!type) {
    res.status(404).json({ message: 'Question type not found' })
    return
  }

  const deletedType = await prisma.type.delete({
    where: {
      id: req.params.id
    }
  })

  res.status(200).json(deletedType)
})

export default router
