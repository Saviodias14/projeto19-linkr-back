 import { signUpRepository, singInRepository, getUsersDB, getUserByIdDB } from "../repositories/user.repositories.js"
 import authService from "../services/authService.js";
 import sessionService from "../services/sessionService.js";

export async function signUp(req, res){
    try {
        await signUpRepository(req.body)

        res.status(201).send({ message: "Conta criado com sucesso." })
    } catch (err) {

        res.status(500).send(err.mesasge)
    }
}


export async function singIn(req, res) {
    try {
        const result = await singInRepository(req.body)

        if (!result || result === null) {
            return res.status(400).send("email ou senha estão incorretos")
        }
        
          const token = authService.generateWebToken(result.rows[0].user_id)

          sessionService.insertTokenInDatabase(token, result.rows[0].user_id)
          res.status(200).send({
            user_id: result.rows[0].user_id,
            username: result.rows[0].username,
            user_photo: result.rows[0].user_photo,
            user_token: token
          });
         

    }catch(err){
         console.log(err.message)
         res.status(500).send(err.mesasge)
    }

}

export async function getUsers(req, res) {
    const { search } = req.body;
    try {
        const allUsers = await getUsersDB(search);
        res.send(allUsers.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getProfile(req, res){
    const { id } = req.params;
    try{
        const userProfile = await getUserByIdDB(id);
        res.send(userProfile.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
