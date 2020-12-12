/**
 * @jest-environment node
 */
const axios = require('axios');
const token = require('../token.js');

const API_URL = 'http://localhost:3000'

const route = 'fileSystem'

// jest.mock('axios')

it('Routes - fileSystem GET', async () => {
    // expect.assertions(2);
    const res = await axios.get(`${API_URL}/fileSystem`)
    console.log(res.data);
    expect(typeof res.data).toBe('object');
    expect(typeof res.data.length).toBe('number');
})
