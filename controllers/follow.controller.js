import { findUserDB, followersRatioDB, followDB } from "../repositories/follow.repository.js";

export async function follow(req, res) {
    const { id } = req.params;
    const { user_id } = res.locals.session;
    if (id === user_id) return res.status(403).send("Operação não permitida.");

    try {
        const userFollowed = await findUserDB(id);
        if (!userFollowed.rowCount) return res.status(404).send("Usuário não encontrado.");

        const follow = await followersRatioDB(id, user_id);
        await followDB(follow.rowCount, id, user_id);
        
        res.send("Sucesso");
    } catch (error) {
        res.status(500).send(error.message);
    }
}