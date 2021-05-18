function handler(req,res) {
    if(req.method === 'POST') {
        const userEmail = req.body.email;
        console.log('email',userEmail);
        if(!userEmail || !userEmail.includes('@')) {
            res.status(422).json({message: 'Invalid Email'})
            return;
        }

        res.status(201).json({message: 'Request Successful', email: userEmail })
        console.log(userEmail);
    }
}
export default handler;
