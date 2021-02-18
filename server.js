const express = require("express")
const next = require("next")

const dev = process.env.NEXT_PUBLIC_NODE_ENV === "production"
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  server.get("/", (req, res) => {
    app.render(req, res, "/")
  })
  server.get("/login", (req, res) => {
    app.render(req, res, "/login")
  })
  server.get("/register", (req, res) => {
    app.render(req, res, "/register")
  })
  server.get("/engineers", (req, res) => {
    app.render(req, res, "/engineers")
  })
  server.get("/companies", (req, res) => {
    app.render(req, res, "/engineers")
  })
  server.get("*", (req, res) => {
    return handle(req, res)
  })
  server.listen(3000, err => {
    if(err) throw err
    console.log('> Ready on http://localhost:3000')
  })
}).catch(ex => {
  console.error(ex.stack)
  process.exit(1)
})
