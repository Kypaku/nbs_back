import {fromJSON} from './../node_modules/gm_node/index.js'
import express from 'express'
var router = express.Router();
import token from './token.js'

const kernels = {}

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
    if (!kernels[name]) {
        kernels[name] = {
            settings,
            status
        }
        Object.defineProperty(kernels[name], 'core', {
            set(nV){
                this.result = eval(nV)
            }
        })
        res.send(kernels);        
    } else {
        res.status(400).send('error: kernel with this name is already exist'); 
    }
});

router.put('/:name', function(req, res, next) {
    if(req.body.token !== token){
        res.send('error: token failed');
        return
    }    
    const name = req.params.name
    if (req.body.valueJson) {
        kernels[name][req.body.attr] = fromJSON(req.body.valueJson)
    } else {
        kernels[name][req.body.attr] = req.body.value
    }
    res.send(kernels[name]);
});

router.delete('/:name', function(req, res, next) {
    // if(req.body.token !== token){
    //     res.send('error: token failed');
    //     return
    // }    
    const name = req.params.name
    delete kernels[name]
    res.send(kernels);
});

router.post('/start/:name', function(req, res, next) {
    if(req.body.token !== token){
        res.send('error: token failed');
        return
    }    
    const name = req.params.name
    kernels[name].status = 'started'
    res.send(kernels[name]);
});

router.post('/stop/:name', function(req, res, next) {
    if(req.body.token !== token){
        res.send('error: token failed');
        return
    }    
    const name = req.params.name
    kernels[name].status = 'stopped'
    res.send(kernels[name]);
});

router.post('/eval/:name', function(req, res, next) {
    if(req.body.token !== token){
        res.send('error: token failed');
        return
    }    
    const name = req.params.name
    if (kernels[name].status === 'started') {
        const content = req.body.content
        kernels[name].core = content
    }
    res.send(kernels[name].result + '');
});

export default router;
