process.env.NODE_ENV = 'test'
const supertest = require('supertest');
const chai = require('chai');
const app = require('../../server');

global.app = app;
global.request = supertest(app);
global.expect = chai.expect;