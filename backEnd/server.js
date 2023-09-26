const expresss = require("express")
const app= expresss()
const db=require("./models")
const parentRoutes = require("./router/parent-router")
const cors = require("cors")

app.use(cors())
app.use(expresss.json())
app.use(expresss.urlencoded({extended:true}))
app.use("/parent",parentRoutes)
app.use("/student",studenRoutes)

 app.listen(4004,()=>console.log("server  listend"))
