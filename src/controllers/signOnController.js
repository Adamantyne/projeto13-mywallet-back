import chalk from "chalk";
import db from "../db.js";
import bcrypt from "bcrypt";

export default async function postSignOn(req,res){
    const {name,email,password} = req.body;
    const cryptPassword = bcrypt.hashSync(password,10);
    try{
        const collection = db.collection("users");
        const alreadyExist = await collection.findOne({email});
        if(alreadyExist){
            res.status(422).send("Email já cadastrado.");
            return;
        }
        await collection.insertOne({
            name:name,
            email:email,
            password:cryptPassword
        });
        res.status(201).send("Conta criada com sucesso !");
    }catch(e){
        res.status(500).send(chalk.red("erro signOn: "+ e));
    }
}