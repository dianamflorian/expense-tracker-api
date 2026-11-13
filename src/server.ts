import app from './app';
import dotenv from 'dotenv';
import { Database } from './database';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Initialize database connection
Database.getInstance();

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default server;
