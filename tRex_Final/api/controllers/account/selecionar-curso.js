/**
 * Module dependencies
 */

// ...


/**
 * account/selecionar-curso.js
 *
 * Selecionar curso.
 */
module.exports = async function selecionarCurso(req, res) {

  console.log(req.me)
	if (req.route.methods.get) {
		let cursos = await Curso.find()
		let cursoAt = null
		cursos.forEach((elemento) => {
			if (elemento.id == req.me.curso) {
				cursoAt = elemento.nome;
			}
		})
		let resp = {
			cursoAt,
			cursos
		}
		return res.view('pages/account/curso', resp)
	} else {
		let { id } = req.me
		let { select } = req.body
		let curso = await Curso.findOne({ nome: select })
		let user = await User.updateOne(id).set({ curso: curso.cursoAt})

		res.redirect('/account')
	}
	return res.ok()

};
