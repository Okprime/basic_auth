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
                // return res.send({
                //     error: false,
                //     code: 201,
                //     message: messageBody,
                // });
            } catch (e) {
                if (e.name === 'MongoError' && e.code === 11000) {
                    console.log('Username already exist');
                    messageBody = 'Username already exist';
                 }
            }
            //      return res.errorResponse({
            //         data: errorData,
            //       });
            //     }
                 return res.errorResponse({
                     message: messageBody,
                  });
                // return res.send ({
                //     code: 400,
                //     message: messageBody
                // })
        },

    //SignIn
    async signIn (req, res) {
        let messageBody;
        let code;
        await signInSchema.validateAsync(req.body);

        try {
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