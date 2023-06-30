
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploader = multer({ storage });

const validateNumber = (number) => {
    return number && !isNaN(number) && number > 0;
  };
  
  export { validateNumber };


import { connect, model, Schema, mongoose } from 'mongoose';

export async function connectMongo() {
  try {
    await connect(
      "mongodb+srv://hugoabrahamv19:nUnEo6GgvLB16DT8@codercluster.foujega.mongodb.net/ecommerce?retryWrites=true&w=majority"
    );
    console.log("Connected to mongodb+srv://hugoabrahamv19:");
  } catch (e) {
    console.log(e);
    throw "Not connect to mongo";
  }
}

