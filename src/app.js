import cookieParser from "cookie-parser"
import express from "express"
import authRoute from "./modules/auth/auth.routes.js"
import ownerRoutes from "./modules/ipl-ms/routes/owner.routes.js"
import teamRoutes from "./modules/ipl-ms/routes/team.routes.js"
import sponsorRoutes from "./modules/ipl-ms/routes/sponsor.routes.js"
import broadcasterRoutes from "./modules/ipl-ms/routes/broadcaster.routes.js"
import team_broadcastersRoutes from "./modules/ipl-ms/routes/team-broadcaster.routes.js"
import team_sponsorsRoutes from "./modules/ipl-ms/routes/team-sponsor.routes.js"
import playerRoutes from "./modules/ipl-ms/routes/player.routes.js"
import ApiError from "./common/utils/api-error.js"

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

app.use("/api/auth", authRoute)
app.use("/api/owners", ownerRoutes)
app.use("/api/teams", teamRoutes)
app.use("/api/sponsors", sponsorRoutes)
app.use("/api/broadcasters", broadcasterRoutes)
app.use("/api/team-broadcasters", team_broadcastersRoutes)
app.use("/api/team-sponsors", team_sponsorsRoutes)
app.use("/api/players", playerRoutes)

// catch-all for undefined routes
// app.all handle all HTTP methods(GET, POST, ...)
// if req not match to previous route, then come here and throw error
app.all("{*path}", (req, res) => {
    throw ApiError.notFound(`Route ${req.originalUrl} not found`)
})

export default app
