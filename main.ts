import router from '@routes';
import express from 'express';

const app = express(), port = process.env.PORT || 3000;

app.use(express.json());
app.use('/', router);

app.listen(port, () => {
  console.log(`Listing on port ${port}`);
});
