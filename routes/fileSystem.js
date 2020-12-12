import {dirname, getFilesFull, isDirectory, getFileExtension, readFileJSON, openFile, getFilesInfo, renameFile, parentDir} from './../node_modules/gm_node/index.js'
import express from 'express'
var router = express.Router();
import token from './token.js'

router.get('/', function(req, res, next) {
    const filepath = req.query.path || dirname()
    const files = getFilesInfo(filepath)
    res.send(files);
});

router.post('/', function(req, res, next) {
    if(req.body.token !== token){
        res.send('error: token failed');
        return
    }
    const file = req.body.file     
    if (getFileExtension(file) === '.jsnb') {
        const data = readFileJSON(file)
        res.send(data)
    } else {
        openFile(file)
        res.send('opened')
    }
});

router.put('/', function(req, res, next) {
    if(req.body.token !== token){
        res.send('error: token failed');
        return
    }    
    const file = req.body.file
    const name = req.body.name
    renameFile(file, parentDir(file) + '/' + name)
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
