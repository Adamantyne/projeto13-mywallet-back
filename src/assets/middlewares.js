import { signInSchema } from "./schemas.js";
import { signOnSchema } from "./schemas.js";

export function signInValidation (req,res,next){
    const body = req.body;
    const validation = signInSchema.validate(body);
    if (validation.error) {
        res.status(422).send(validation.error.details.map(
            detail=>detail.message
        ));
        return;
    }
    if (body.password!==body.repeatPassword) {
        res.status(422).send("Repita a senha corretamente.");
        return;
    }
    next();
}
export function signOnValidation (req,res,next){
    const body = req.body;
    const validation = signOnSchema.validate(body);
    if (validation.error) {
        res.status(422).send(validation.error.details.map(
            detail=>detail.message
        ));
        return;
    }
    next();
}