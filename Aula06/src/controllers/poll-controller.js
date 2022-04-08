const { getConnection } = require("../data/database");
const Poll = require("../models/poll");

class PollController {
    async create(req, res) {
        // salvar no banco
        const { description, opt_a, opt_b, opt_c, finished_at } = req.body;

        // 1 = usuario logado
        const poll = new Poll(
            description, 
            req.session.user.id, 
            new Date(), 
            finished_at, 
            opt_a, 
            opt_b, 
            opt_c
        );

        const con = await getConnection();
        const sql = `
        INSERT INTO public.polls 
            (description, added_by, created_at, finished_at, opt_a,opt_b, opt_c)
        VALUES ($1, $2, $3, $4, $5, $6, $7);`
        
        const values = [poll.description, poll.addedBy, poll.createdAt, poll.finishedAt, poll.optA, poll.optB, poll.optC];

        const result = await con.query(sql, values);
        console.log('Inserido com sucesso');
        console.log({ result });

        return res.redirect('/');
    }

    async detail(req, res) {
        const { id } = req.params;
        const con = await getConnection();
        const sql = `SELECT * FROM polls WHERE id = $1`;
        const result = await con.query(sql, [id]);

        const pollDb = result.rows[0];
        
        const poll = new Poll(
            pollDb.description, 
            pollDb.added_by, 
            pollDb.createdAt,
            pollDb.finishedAt, 
            pollDb.opt_a, 
            pollDb.opt_b, 
            pollDb.opt_c,
            pollDb.id
        )
        return res.render('poll-vote', { poll });

    }

    async vote(req, res) {

        const userId = req.session.user.id;
        const { pollId, opt } = req.body;

        const sql = `INSERT INTO votes (user_id, poll_id, opt) VALUES ($1, $2, $3)`;
        const values = [userId, pollId, opt];

        const connection = await getConnection();
        await connection.query(sql, values);

        return res.redirect('/')
    }
}
module.exports = PollController;