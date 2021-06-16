import { AdminLogin } from "../services/AdminService"
import AdminRoute from "./admin"
import UserRoute from "./user"

function MountApp(app){

 app.use("/admin",AdminRoute);
    app.use("/",UserRoute);
    
   
}
export default MountApp;