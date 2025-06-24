import express from 'express'
const UserRouter = express.Router();
import { GetUser, GetUserById, DeleteUser, EditUser } from "../controller/usercontroller.js"
import VarifiyUser from "../middleware/Varifiyjwt.js"

UserRouter.get('/', VarifiyUser, GetUser);
UserRouter.get('/:id', VarifiyUser, GetUserById);
UserRouter.delete('/:id', VarifiyUser, DeleteUser);
UserRouter.put('/:id', VarifiyUser, EditUser);


export default UserRouter 