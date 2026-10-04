import dotenv from 'dotenv';
import path from 'node:path';
import app from './src/app.js';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const port = Number(process.env.PORT || 3001);

app.listen(port, () => {
  console.log(`FinGuard AI backend running on http://localhost:${port}`);
});
