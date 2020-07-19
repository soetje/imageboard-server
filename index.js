const express = require("express")
const userRouter = require("./routers/user.js")
const imageRouter = require("./routers/image.js")

const app = express()
const port = 4000
const jsonParser = express.json()

app.use(jsonParser)
app.use("/users", userRouter)
app.use("/images", imageRouter)

app.listen(port, () => console.log(`listening on port  ${port}`))