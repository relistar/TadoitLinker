import {BASE_API} from "../../../../strapi/api";

export default function postLoginFormHandler(req, res) {
    BASE_API.loginByCredentials(JSON.stringify(req.body))
        .then(function (response) {
            res.status(200).json(response.data)
        })
        .catch(function (error) {
            res.status(error.response.status).json(error.response.data)
        });
}