module.exports = async function viewCurso(req, res) {

	let id = req.param('id')
	let cursoOk = await Curso.findOne({ id })

	let resp = {
		title: `Visualizar dados do curso`,
		sigla: cursoOk.sigla,
		nome: cursoOk.nome,
		descricao: cursoOk.descricao,
	}

	return res.view('pages/curso/read', resp);

};