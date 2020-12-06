var express = require('express');
var router = express.Router();

const kernels = {}

router.get('/', function(req, res, next) {
    res.send('kernels: ' + JSON.stringify(kernels));
});

router.post('/', function(req, res, next) {
    const name = req.body.name
    // console.log(req.body);
    //check name
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
});

router.put('/', function(req, res, next) {
    //edit
    res.send('edited: '+ name);
});

router.delete('/', function(req, res, next) {
    const name = req.body.name
    delete kernels[name]
    //del core
    res.send('deleted: '+ name);
});

router.post('/start/:name', function(req, res, next) {
    const name = req.params.name
    kernels[name].status = 'started'
    res.send('started: '+ name);
});

router.post('/stop/:name', function(req, res, next) {
    const name = req.params.name
    kernels[name].status = 'stopped'
    res.send('stopped: '+ name);
});

router.post('/eval/:name', function(req, res, next) {
    const name = req.params.name
    if (kernels[name].status === 'started') {
        const cell = req.body.cell
        kernels[name].core = cell
    }
    res.send( kernels[name].result);
});

module.exports = router;
