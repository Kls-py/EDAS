import { Router } from "express";

import CursoController from "../controllers/CursoController.js";
import TurmaController from "../controllers/TurmaController.js";
import UsuarioController from "../controllers/UsuarioController.js";
import DisciplinaController from "../controllers/DisciplinaController.js";
import ProvaController from "../controllers/ProvaController.js";
import SessionController from "../controllers/SessionController.js";
import authMiddleware from "../middlewares/auth.js";

const routes = new Router();

routes.get('/curso', CursoController.show);
routes.get('/cursos', CursoController.index);
routes.get('/turma', TurmaController.show);
routes.get('/turmas', TurmaController.index);
routes.post('/session', SessionController.store);

routes.use(authMiddleware);

routes.get('/disciplina', DisciplinaController.show);
routes.get('/disciplinas', DisciplinaController.index);
routes.get('/prova', ProvaController.show);
routes.get('/provas', ProvaController.index);
routes.post('/prova', ProvaController.store);
routes.get('/usuarios', UsuarioController.index);
routes.post('/usuario', UsuarioController.store);

export default routes;