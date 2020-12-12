import {dirname, writeFileJSON, isDirectory, getFileExtension, readFileJSON, openFile, getFilesInfo, renameFile, parentDir} from './../node_modules/gm_node/index.js'
import express from 'express'
var router = express.Router();
import token from './token.js'

router.get('/', function(req, res, next) {
    const filepath = req.query.path || dirname()
    const files = getFilesInfo(filepath)
    res.send(files);
});

router.get('/open', function(req, res, next) {
    const file = req.query.path   
    if (getFileExtension(file) === '.jsnb') {
        const data = readFileJSON(file)
        res.send(data)
    } else {
        openFile(file)
        res.send('opened')
    }
});

//Save
router.post('/', function(req, res, next) {
    if(req.body.token !== token){
        res.send('error: token failed');
        return
    }    
    const file = req.body.file
    const data = req.body.body
    writeFileJSON(file, data)
    res.send('ok');
});

//Rename
router.put('/', function(req, res, next) {
    if(req.body.token !== token){
        res.send('error: token failed');
        return
    }    
    const file1 = req.body.file1
    const file2 = req.body.file2
    renameFile(file1, file2)
    res.send('ok');
});

// router.delete('/', function(req, res, next) {
//     if(req.body.token !== token){
//         res.send('error: token failed');
//         return
//     }    
//     const file = req.body.file
    
//     res.send('deleted: '+ file);
// });

export default router;
