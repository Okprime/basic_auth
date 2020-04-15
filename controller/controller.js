const { signUpSchema, signInSchema } = require('../schema/schema');
const service = require('../service/service');


module.exports = {
        // SIgnUp
        async signUp (req, res) {
            let response;
            let messageBody;
            await signUpSchema.validateAsync(req.body);
            try {
                const result = await service.saveUser(req.body);
                response = result;
                console.log('result', result);
                messageBody = 'You have successfully signed up';
                    return res.successResponse({
                          message: messageBody,
                        });
            } catch (e) {
                if (e.name === 'MongoError' && e.code === 11000) {
                    console.log('Username already exist');
                    messageBody = 'Username already exist';
                 }
            }
                 return res.errorResponse({
                     message: messageBody,
                  });
        },

    //SignIn
    async signIn (req, res) {
        let messageBody;
        let code;
        await signInSchema.validateAsync(req.body);

        try {
            const isExist = await service.validateUser(req.body);
            if (isExist) {
                console.log('You have successfully signed up')
                messageBody = 'You have successfully signed up';
                return res.successResponse({
                    message: messageBody,
                });
            } else if (isExist === false) {
                console.log('Incorrect password');
                messageBody =  'Incorrect password';
            } else if (isExist === null) {
                console.log('User does not exist, kindly sign up');
                messageBody = 'User does not exist, kindly sign up';
            }
            return res.errorResponse({
                message: messageBody,
            })
        } catch (e) {
            console.log('An error occurred', e);
            messageBody = 'Something went wrong';
            return res.errorResponse({
                message: messageBody,
            })
        }
    }
};