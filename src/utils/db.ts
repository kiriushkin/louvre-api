import { connect } from 'mongoose';

const start = async () => {
  await connect('mongodb://mongo:27017/');

  console.log('Connected to MongoDB');
};

start();
