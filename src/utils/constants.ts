import process from 'process';
import path from 'path';
export const rootDir = path.resolve(__dirname,'..');
export const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z0-9]+$/;

export const MONGO_URL = process.env.MONGO_DB_URL as string;
// = 'mongodb+srv://raijin:raijin@cluster0.cvfdt.mongodb.net/fujin?retryWrites=true&w=majority';

export const SECRET = process.env.JWT_SECRET as string;
// = 'm1h41is1337kthxbbq'; //TODO this should be an environment variable.
