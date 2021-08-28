import UserMessage from '../models/UserMessage.js';
import JoiBase from 'joi'
import JoiDate from '@joi/date'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const Joi = JoiBase.extend(JoiDate)



 export const Login = async (req, res) => {

    try {
        await UserMessage.findOne({$or: [{
            email: req.body.email
        }, {
            username: req.body.username
        }]}, function( error ,user) {
            if(user){
                bcrypt.compare( req.body.password, user.password, function(err, resp) {
                    if(resp){
                        jwt.sign({resp}, 'secretkey', (err, token) => {
                            res.status(200).json({user, token});
                        })
                    } else res.send({message: 'incorrect username or password'})
                });
            } else {
                res.send({message: 'incorrect username or password'})
            }
        })

    } catch (error) {
        res.status(404).json({ message: error.message });
        
    }
} 

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
export const verifyToken = (req, res, next) => {
    // Get auth header value
    const bearerHeader = req.headers['authorization']
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(" ")
        // Get token from array
        const bearerToken = bearer[1]
        // Set the token
        req.token = bearerToken
        // Next middleware
        next()

    } else {
        // Forbidden
        res.sendStatus(403)
    }

}

export const postt = (req,res) => {
    jwt.verify(req.token, 'secretkey', (err, data) => {
        if(err) {
            res.sendStatus(403)
        } else res.json({message: "post created..."})
    })
    
}

export const createUser = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .required(),
        birth: Joi.date()
            .format("DD/MM/YYYY")
            .required(),
    })

    const {error} = schema.validate(req.body)

    if(error) return res.status(400).send(error.details[0].message)
    let user = req.body;
    user = {...user, active: 0}
    const newUser = new UserMessage(user)

    try {
        await UserMessage.findOne({email:user.email}, function(error, user){
            if(user){
                if(user.username)
                res.send({ error: "Account already created" });
                else {
                /* newUser.save(); */
                res.status(201).json(newUser);
                }
            } else {
                newUser.save();
                res.status(201).json(newUser);
            }
        })
        

       
    } catch (error) {
        res.status(409).json({ message: error.message });

    } 
}

export const secregisterUser = async (req, res) => {
    const schema = Joi.object({
        email: Joi.string()
            .required(),
        username: Joi.string()
            .min(6)
            .required(),
        password: Joi.string()
            .min(6)
            .required(),
    })

    const {error} = schema.validate(req.body)

    if(error) return res.send(error.details[0].message)
    const usern = req.body;

   

    try {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(usern.password,salt)

        await UserMessage.findOne({$or: [{
            email: usern.email
        }, {
            username: usern.username
        }]}, function( error ,user) {
            if (user) {
                let errors = {};
                if (user.username === usern.username) {
                    errors.username = "User Name already exists";
                    res.send({errors})
                } else if(user.email === usern.email){

                    // update the user object found using findOne
                    user.username = usern.username;
                    user.password = password;
                    // now update it in MongoDB
                    user.save();
                    res.status(201).json(usern);
                }    
                       
            } 
        });

      
    } catch (error) {
        res.status(409).json({ message: error.message });

    } 
}