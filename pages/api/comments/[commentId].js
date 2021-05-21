import { MongoClient } from 'mongodb';
async function handler(req, res) {

  const client = await MongoClient.connect(
    'mongodb+srv://ronchinextjs:3vPLxB5YBlzDn0R0@cluster0.d74th.mongodb.net/events?retryWrites=true&w=majority'
  );

  const commentId = req.query.commentId;

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    const newComment = {
      email,
      name,
      text,
      commentId,
    };

    const db = client.db();

    const result = await db.collection('comments').insertOne(newComment);
    console.log(result);

    res.status(201).json({ message: 'Comment success', comment: newComment });
  }
  
  if (req.method === 'GET') {
    const db = client.db()

    const result = await db
      .collection('comments')
      .find()
      .filter({ commentId })
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({ list: result });
  }
  client.close();
}
export default handler;
