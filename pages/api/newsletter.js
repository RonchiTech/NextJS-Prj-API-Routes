import { MongoClient } from 'mongodb';
async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;
    console.log('email', userEmail);
    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid Email' });
      return;
    }

    const client = await MongoClient.connect(
      'mongodb+srv://ronchinextjs:3vPLxB5YBlzDn0R0@cluster0.d74th.mongodb.net/events?retryWrites=true&w=majority'
    );

    const db = client.db();

    await db.collection('newsletter').insertOne({ email: userEmail });

    client.close()

    res.status(201).json({ message: 'Request Successful', email: userEmail });

    console.log(userEmail);
  }
}
export default handler;
