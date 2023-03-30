import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

export default [cors(), express.json(), express.urlencoded({ extended: false }), morgan('tiny')];
