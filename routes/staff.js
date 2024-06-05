import {Router} from 'express';
import multer from 'multer';
import staffsController from '../controllers/staff.js';

const staffRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

staffRouter.post('/update', upload.single('file'), staffsController.updateStaff);

staffRouter.post('/delete', staffsController.deleteStaff);

staffRouter.get('/id', staffsController.getStaffId);

staffRouter.get('/user', staffsController.getStaff);

staffRouter.get('/deleteAll', staffsController.deleteAllStaff);

export default staffRouter;