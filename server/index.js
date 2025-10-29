import express from "express";

const app = express()
const PORT = 3000

app.get("/", (req, res) => {
    res.send("Hello sadddam")
})

app.listen(PORT, () => {
    console.log(`server is communicating in port : ${PORT}`)
})