import Prova from "../models/Prova.js";
import * as Yup from 'yup';


class ProvaController {

    async show(req,res) {

        const schema = Yup.object().shape({
            id: Yup.number().min(1) 
        });

        if(! (await schema.isValid(req.query))) {
            return res.status(400).json({error: "Formato inválido."});
        };

        const { id } = req.query;
        const prova = await Prova.findByPk(id);

        if(!prova) {
            return res.status(400).json({error: "Prova não encontrada"});
        };

        const { curso, ano, turma, disciplina, dia, horario, usuario } = prova;
        return res.json({
            id, 
            curso,
            ano,
            turma,
            disciplina,
            dia,
            horario,
            usuario
        });
    };

    async index(req,res) {
        const provas = await Prova.findAll();
        return res.json(provas);
    };

    async store(req,res) {

        console.log(">>>>", req.body);

        const schema = Yup.object().shape({
            curso: Yup.number().min(1).required(),
            ano: Yup.number().min(1).required(),
            turma: Yup.number().min(1).required(),
            disciplina: Yup.number().min(1).required(),
            dia: Yup.string().required(),
            horario: Yup.string().required(),
            usuario: Yup.number().min(1).required(),
        });

        if(! (await schema.isValid(req.body))) {
            return res.status(400).json({error: "Formato inválido."});
        };

       /*const provaStore = await Prova.findOne({
            where: {curso: req.body.curso},
            where: {ano: req.body.ano},
            where: {turma: req.body.turma},
            where: {disciplina: req.body.disciplina},
            where: {horario: req.body.horario}
        });

        if(provaStore) {
            return res.status(400).json({error: "A prova já está cadastrada."});
        }*/

        const { id, curso, ano, turma, disciplina, dia, horario, usuario } = await Prova.create(req.body);
        return res.json({
            id,
            curso,
            ano,
            turma,
            disciplina,
            dia, 
            horario,
            usuario
        });
    };
};

export default new ProvaController();