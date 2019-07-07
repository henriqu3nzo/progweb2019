/**
 * CursoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: async function(req, res) {
    var cursos = await Curso.find();
    res.view('curso/index', {cursos:cursos});
  },
  create: async function(req, res) {
    if(req.route.methods.get){
      res.view('curso/create');
    }else{
      console.log(req.body.sigla);
      console.log(req.body.nome);
      console.log(req.body.desc);
        Curso.create({
          
          sigla:req.body.sigla,
          nome:req.body.nome,
          descricao:req.body.desc
        })
        .then(function(){
          res.redirect('/curso');
        })
        .catch(function(error){
            res.view('curso/create',{error:error})
        })
    }
  },
  read: async (req, res) => {
    let id = req.param('id')
    let curso = await Curso.findOne({ id })

    let resp = {
      title: `Visualizar dados do curso`,
      sigla: curso.sigla,
      nome: curso.nome,
      descricao: curso.descricao,
	}

	    res.view('curso/read', resp);
  },

  update: async (req, res) => {

        try {
            let { id, nome, sigla, descricao } = req.body
            let updateCurso = { 
              nome, 
              sigla, 
              descricao }
            let cursoUpdate = await Curso.updateOne({ id }).set(updateCurso)
            res.redirect('/curso')
        } catch (err) {
            console.log(err)
            res.send(err)
        }

    },
    delete: async (req, res) => {
      try {
          let id = req.param('id')
          let eraseOk = await Curso.destroyOne({ id })
          res.redirect('/curso')
      } catch (err) {
          res.send(err)
      }
  },

};

