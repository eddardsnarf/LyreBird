import process from 'process';
import path from 'path';
export const MONGO_URL = process.env.MONGO_DB_URL as string;
// = 'mongodb+srv://raijin:raijin@cluster0.cvfdt.mongodb.net/fujin?retryWrites=true&w=majority';
export const rootDir = path.resolve(__dirname,'..');
