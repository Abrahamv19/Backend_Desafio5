import express from 'express';
import UserService from "../services/dbuser.service.js";
const usersService = new UserService();

const sessionsRouter = express.Router();

sessionsRouter.post("/register", async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;
    const response = await usersService.addUser(firstName, lastName, email, password, role);
    return res.status(response.code).json(response.result);
});

sessionsRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (email == "adminCoder@coder.com" && password == "adminCod3r123") {
        req.session.user = {
          firstName: "Admin",
          lastName: "Coder",
          email: email,
          role: "admin",
        };
        return res.send({
          status: "success",
          message: "You have successfully logged in",
        });
      }

    const response = await usersService.login(email, password);
    if (response.code === 200) {
        req.session.user = response.result.payload;
    }

    return res.status(response.code).json(response.result);
});



sessionsRouter.get("/logout", async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Error! Couldn't logout!" });
        }
        res.clearCookie("connect.sid");
        return res.status(200).json({ message: "Logout succesfully!" });
    });
});


export default sessionsRouter;