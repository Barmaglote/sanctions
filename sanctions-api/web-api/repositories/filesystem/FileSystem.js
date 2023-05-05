import multer from 'multer';
import fs from 'fs';
import path from 'path';
const __dirname = path.normalize(path.dirname(new URL(import.meta.url).pathname)).slice(1); // Delete "/", because it not Unix now

const SUBFOLDERS_SPLITTER = "/";

// Set up storage for uploaded files
const storage = (folder, subfolder) => multer.diskStorage({
    destination: function(req, file, cb) {        

        let folders = folder.split(SUBFOLDERS_SPLITTER)
        let UPLOADS_FOLDER = null;

        folders.forEach(element => {
            if (!UPLOADS_FOLDER) {
                UPLOADS_FOLDER = path.join(__dirname, `../../uploads/${element}`); // Move to container      
            } else {
                UPLOADS_FOLDER = `${UPLOADS_FOLDER}/${element}`; // Move to container
            }

            if (!fs.existsSync(UPLOADS_FOLDER)) {
                fs.mkdirSync(UPLOADS_FOLDER);
            }                        
        });

      const UPLOADS_SUB_FOLDER = `${UPLOADS_FOLDER}/${subfolder}`; // Move to container
      if (!fs.existsSync(UPLOADS_SUB_FOLDER)) {
        fs.mkdirSync(UPLOADS_SUB_FOLDER);
      }                  

      return cb(null, UPLOADS_SUB_FOLDER);
    },
    filename: function(req, file, cb) {      
      return cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
// Set up multer middleware
export const upload = (folder, subfolder) => multer({ storage: storage(folder, subfolder) });

export const uploadProfileAuthentity = (req, res) => {
    res.send('File uploaded successfully');
}

