import chalk from "chalk";
import db from "../db.js";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import {v4 as uuid} from "uuid";

export default async function postSignIn(req,res){
    const {email,password} = req.body;
    try{
        const user = await db.collection("users").findOne({email});
        if(!user){
            res.status(422).send("Usuário não cadastrado");
            return;
        }
        if(!bcrypt.compareSync(password,user.password)){
            res.status(422).send("Email ou senha incorreta");
            return;
        }
        const oldSession = await db.collection("sessions").findOne({email});
        if(oldSession){
            console.log("excluindo "+oldSession);
            await db.collection("sessions").deleteOne({oldSession});
            await db.collection("oldSessions").insertOne({oldSession});
        }
        const token = uuid();
        await db.collection("sessions").insertOne({
            email:email, 
            token:token,
            time: dayjs().format("DD/MM/YYYY h:mm:ss"),
            tokenTime: Date.now()
        });
        delete user.password;
        delete user._id
        res.status(201).send(user);
    }catch(e){
        res.status(500).send(chalk.red("erro signIn: "+ e));
    }
}