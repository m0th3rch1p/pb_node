import fs from 'fs';
import path from 'path';

let modelName = process.env.npm_config_model;
if (!modelName) {
    console.error("Usage: create_model --model=modelName\n");
    
} else {
    modelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);

    const fileName = `${modelName}.model.ts`;
    const filePath = path.join(__dirname, fileName);

    fs.open(filePath, 'wx', (err, fd) => {
      if (err) {
        if (err.code === 'EEXIST') {
          console.log('Model file already exists.');
        } else {
          console.error(`Error opening migration file: ${err}`);
        }
        return;
      }

      const stream = fs.createWriteStream('', {fd});

      stream.write(`
import { Request } from "express";
import * as core from 'express-serve-static-core';

export interface I${modelName} {
    id?: number,
    created_at?: string,
    updated_at?: string
};

export interface IGet${modelName}Req extends Request<{id: I${modelName}["id"]}, any, any> {};
export interface IAdd${modelName}Req extends Request<core.Params, I${modelName}, any> {};
export interface IUpdate${modelName}Req extends Request <{id: I${modelName}["id"]}, I${modelName}, any>{};`);

      stream.end();

      stream.on('finish', () => {
        console.log('Model file created successfully.');
        fs.close(fd, (closeErr) => {
          if (closeErr) {
            console.error(`Error closing model file: ${closeErr}`);
          }
        });
      });

      stream.on('error', (err) => {
        console.error(`Error writing to model file: ${err}`);
        fs.close(fd, (closeErr) => {
          if (closeErr) {
            console.error(`Error closing model file: ${closeErr}`);
          }
        });
      });
    });

}

