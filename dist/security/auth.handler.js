"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_model_1 = require("../users/users.model");
const restify_errors_1 = require("restify-errors");
const jwt = require("jsonwebtoken");
const environment_1 = require("../common/environment");
exports.authenticate = (req, resp, next) => {
    const { email, senha } = req.body;
    users_model_1.User.findByEmail(email, '+senha') // projeção para que seja feita a query trazendo a senha, sem quebrar o que já foi implementado
        .then(user => {
        if (user && user.matches(senha)) {
            // gerar o token
            const token = jwt.sign({ sub: user.email, iss: 'meat-api' }, environment_1.environment.security.apiSecret); // email é importante para o processo inverso 
            resp.json({ nome: user.nome, email: user.email, accessToken: token });
            return next(false);
        }
        else {
            // indicando o motivo da falha 
            return next(new restify_errors_1.NotAuthorizedError('Credenciais Inválidas!'));
        }
    }).catch(next);
};
