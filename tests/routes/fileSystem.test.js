/**
 * @jest-environment node
 */
const axios = require('axios');
const token = require('../token.js');
const API_URL = require('../api.js');
// const API_URL = http://localhost:3000
const fs = require('fs')

const route = 'fileSystem'
const samplesDir = __dirname + "/../../samples/"

// jest.mock('axios')

it(`Routes - ${route} GET`, async () => {
    const res = await axios.get(`${API_URL}/${route}`)
    expect(typeof res.data).toBe('object');
    expect(typeof res.data.length).toBe('number');
})

it(`Routes - ${route} GET /open`, async () => {
    const res = await axios.get(`${API_URL}/${route}/open?path=${samplesDir + "/test.jsnb"}`)
    expect(typeof res.data).toBe('object');
})

it(`Routes - ${route} PUT (rename file)`, async () => {
    const fileToRename = fs.readdirSync(samplesDir).find(el => ~el.indexOf('test_rename_file'))
    const stamp = +new Date()
    const renamed = samplesDir + '/' + fileToRename.replace(/\d+/g, '') + stamp
    const res = await axios.put(`${API_URL}/${route}`, {file1: samplesDir + '/' + fileToRename , file2: renamed, token})   
    console.log(res.data); 
    expect(fs.existsSync(renamed)).toBe(true);
})

it(`Routes - ${route} POST (save file)`, async () => {
    const fileToWrite = fs.readdirSync(samplesDir).find(el => ~el.indexOf('test_rename_file'))
    const file = samplesDir + '/' + fileToWrite
    const stamp = +new Date()
    const res = await axios.post(`${API_URL}/${route}`, {file, body: stamp, token})   
    const data = fs.readFileSync(file).toString()
    expect(data).toBe(stamp + '');
})
