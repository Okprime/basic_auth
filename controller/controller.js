const { signUpSchema, signInSchema } = require('../schema/schema');
const service = require('../service/service');
// const {ValidationError} = require("@hapi/joi/lib/errors");


module.exports = {
        // SIgnUp
        async signUp (req, res) {
            let response;
            let messageBody;

            try {
                await signUpSchema.validateAsync(req.body);
                const result = await service.saveUser(req.body);
                response = result;
                console.log('result', result);
                messageBody = 'You have successfully signed up';
                return res.send({
                    error: false,
                    code: 201,
                    message: messageBody,
                });
            } catch (e) {
                console.log('An error occurred', e);
                if (e.name === 'MongoError' && e.code === 11000) {
                    messageBody = 'Username already exist';
                 } else if (e === ValidationError) {
                    messageBody = 'Missing field';
                } else {
                    messageBody = 'Invalid email';
                }
            }
                return res.send ({
                    code: 400,
                    message: messageBody
                })
        },

    //SignIn
    async signIn (req, res) {
        let messageBody;
        let code;
        try {
            await signInSchema.validateAsync(req.body);
            const isExist = await service.validateUser(req.body);
            if (isExist) {
                messageBody = 'You have successfully signed up';
                code = 201;
            } else if (isExist === false) {
                messageBody =  'Incorrect password';
                code = 400;
            } else if (isExist === null) {
                messageBody = 'User does not exist, kindly sign up';
                code = 400;
            }
            return res.send({
                error: false,
                code: code,
                message: messageBody,
            });
        } catch (e) {
            console.log('An error occurred', e);
            messageBody = 'Something went wrong';
            return res.send ({
                code: 504,
                message: messageBody
            })
        }
    }
};