import { log_middleware } from '@middlewares';
import router from '@routes';
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(log_middleware);
app.use('/', router);

app.listen(port, () => {
  console.log(`Listing on port ${port}`);
});
