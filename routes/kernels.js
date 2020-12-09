import express from 'express'
var router = express.Router();
import token from './token.js'

const kernels = {}

router.get('/', function(req, res, next) {    
    res.send('kernels: ' + JSON.stringify(kernels));
});

router.post('/', function(req, res, next) {
    if(req.body.token !== token){
        res.send('error: token failed');
        return
    }
    const name = req.body.name
    // console.log(req.body);
    if (!kernels[name]) {
        kernels[name] = {
            settings: {},
            status: 'initialized'
        }
        Object.defineProperty(kernels[name], 'core', {
            set(nV){
                this.result = eval(nV)
            }
        })
        res.send('added: '+ name);        
    } else {
        res.send('error: kernel with this name is already exist'); 
    }
});

router.put('/:name', function(req, res, next) {
    if(req.body.token !== token){
        res.send('error: token failed');
        return
    }    
    const name = req.params.name
    if (req.body.valueJson) {
        kernels[name][req.body.attr] = JSON.parse(req.body.valueJson)
    } else {
        kernels[name][req.body.attr] = req.body.value
    }
    res.send('edited: '+ name);
});

router.delete('/:name', function(req, res, next) {
    if(req.body.token !== token){
        res.send('error: token failed');
        return
    }    
    const name = req.params.name
    delete kernels[name]
    res.send('deleted: '+ name);
});

router.post('/start/:name', function(req, res, next) {
    if(req.body.token !== token){
        res.send('error: token failed');
        return
    }    
    const name = req.params.name
    kernels[name].status = 'started'
    res.send('started: '+ name);
});

router.post('/stop/:name', function(req, res, next) {
    if(req.body.token !== token){
        res.send('error: token failed');
        return
    }    
    const name = req.params.name
    kernels[name].status = 'stopped'
    res.send('stopped: '+ name);
});

router.post('/eval/:name', function(req, res, next) {
    if(req.body.token !== token){
        res.send('error: token failed');
        return
    }    
    const name = req.params.name
    if (kernels[name].status === 'started') {
        const cell = req.body.cell
        kernels[name].core = cell
    }
    res.send( kernels[name].result);
});

export default router;
