import { connectDatabase, insertDocument, fetchDocument } from '../../../helpers/db-util';
async function handler(req, res) {
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the Database failed.' });
    return;
  }

  const commentId = req.query.commentId;

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    const newComment = {
      email,
      name,
      text,
      commentId,
    };
    let result;
    try {
      result = await insertDocument(client, 'comments', newComment);
      newComment._id = result._id;
      res.status(201).json({ message: 'Comment success', comment: result });
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed!' });
    }
  }

  if (req.method === 'GET') {
    let fetchResult;
    try {
      fetchResult = await fetchDocument(
        client,
        'comments',
        { _id: -1,},
        {commentId } 
      );
      res.status(200).json({ list: fetchResult });
    } catch (error) {
      res.status(500).json({ message: 'Fetching data failed.' });
    }
  }
  client.close();
}
export default handler;
