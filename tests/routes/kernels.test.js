/**
 * @jest-environment node
 */
const axios = require('axios');
const token = require('../token.js');
const fs = require('fs')
const API_URL = require('../api.js')

const route = 'kernels'

const kernelName = 'kernel_for_testing_' + +new Date()

let kenelsL

it(`Routes - ${route} GET`, async () => {
    const res = await axios.get(`${API_URL}/${route}`)
    expect(typeof res.data).toBe('object');
})

it(`Routes - ${route} POST`, async () => {
    const res = await axios.post(`${API_URL}/${route}`, {name: kernelName, status: 'started', token})   
    expect(typeof res.data).toBe('object');
    kenelsL = res.data.length
    expect(kenelsL > 0).toBe(true);
})

it(`Routes - ${route} POST /eval`, async () => {
    const res = await axios.post(`${API_URL}/${route}/eval/${kernelName}`, {content: '1+1', token})
    expect(res.data).toBe(2);
})

it(`Routes - ${route} DELETE`, async () => {
    const res = await axios.delete(`${API_URL}/${route}/${kernelName}`)
    expect(typeof res.data).toBe('object');
    expect(res.data.length).toBe(kenelsL - 1);
})
