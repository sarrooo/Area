import express from 'npm:express'

const app = express();

app.get("/", (req, res) => {
    res.send("Welcome to TRIREA!")
})

app.listen(8000)