/**
 * GameController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    trex: async function (req, res) {
        res.view('game/trex');
       },

    salvarPontuacao: async function(req, res){
        await Jogada.create({
            jogador: req.me.id,
            pontuacao: req.body.pontuacao,
        });
       // res.end('Pontuacao salava' + )
    }
};
