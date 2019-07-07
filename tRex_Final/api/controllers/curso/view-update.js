module.exports = async function viewCursoUpdate(req, res) {

	let id = req.param('id')
	let cursoOk = await Curso.findOne({ id })

	let resp = {
		title: `Atualizar dados do curso`,
		sigla: cursoOk.sigla,
		nome: cursoOk.nome,
		descricao: cursoOk.descricao,
		id,
		update: true
	}

	return res.view('curso/update', resp);

};