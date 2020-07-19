const express = require("express")
const { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } = require("constants")
const { Router } = express
const Image = require("../models").image

const router = new Router()

router.get("/", async (req, res) => {
  try {
    const limit = Math.min(req.query.limit || 25, 500)
    const offset = req.query.offset || 0

    Image.findAndCountAll({ limit, offset })
      .then((result) => res.send({ images: result.rows, total: result.count }))
      .catch((error) => next(error))

    const image = await Image.findAll()
    res.json(image)
  } catch (error) {
    res.status(400).send({ message: "Error in getting image, sorry" })
  }
})

router.post("", async (req, res, next) => {
  try {
    const newImage = await Image.create(req.body)
    res.json(newImage)
  } catch (error) {
    next(error)
  }
})

router.get("/:imageId", async (req, res, next) => {
  try {
    const image = await Image.findByPk(req.params.imageId)
    res.json(image)
  } catch (error) {
    next(error)
  }
})

module.exports = router
