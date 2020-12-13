import {fromJSON} from './../node_modules/gm_node/index.js'
import express from 'express'
var router = express.Router();
import token from './token.js'

let kernels = []

router.get('/', function(req, res, next) {    
    res.send(kernels);
});

router.post('/', function(req, res, next) {
    if(req.body.token !== token){
        res.send('error: token failed');
        return
    }
    const name = req.body.name
    const settings = req.body.settings ? fromJSON(req.body.settings) : {}
    const status = req.body.status || 'initialized'    
    if (!kernels.find(el => el.name === name)) {
        const kernel = {
            name,
            settings,
            status
        }
        Object.defineProperty(kernel, 'core', {
            set(nV){
                this.result = eval(nV)
            }
        })
        kernels.push(kernel)
        res.send(kernel);        
    } else {
        res.status(400).send('error: kernel with this name is already exist'); 
    }
});

router.put('/:name', function(req, res, next) {
    if(req.body.token !== token){
        res.send('error: token failed');
        return
    }    
    const kernel = kernels.find(el => el.name === name)
    const name = req.params.name
    if (req.body.valueJson) {
        kernel[req.body.attr] = fromJSON(req.body.valueJson)
    } else {
        kernel[req.body.attr] = req.body.value
    }
    res.send(kernel);
});

router.delete('/:name', function(req, res, next) {
    // if(req.body.token !== token){
    //     res.send('error: token failed');
    //     return
    // }    
    const name = req.params.name
    kernels = kernels.filter(el => el.name !== name)
    res.send(kernels);
});

router.post('/start/:name', function(req, res, next) {
    if(req.body.token !== token){
        res.send('error: token failed');
        return
    }    
    const name = req.params.name
    const kernel = kernels.find(el => el.name === name)
    kernel.status = 'started'
    res.send(kernel);
});

router.post('/stop/:name', function(req, res, next) {
    if(req.body.token !== token){
        res.send('error: token failed');
        return
    }    
    const name = req.params.name
    const kernel = kernels.find(el => el.name === name)
    kernel.status = 'stopped'
    res.send(kernel);
});

router.post('/eval/:name', function(req, res, next) {
    if(req.body.token !== token){
        res.send('error: token failed');
        return
    }    
    const name = req.params.name
    const kernel = kernels.find(el => el.name === name)
    if (kernel.status === 'started') {
        const content = req.body.content
        kernel.core = content
    }
    res.send(kernel.result + '');
});

export default router;
