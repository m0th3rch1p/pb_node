import fs from 'fs';
import path from 'path';

let modelName: string | undefined = process.env.npm_config_model;
let controllerName : string | undefined = process.env.npm_config_name;
if (!modelName || !controllerName) {
    console.error("Usage: create_controller --name=controllerName --model=modelName\n");
    
} else {
    modelName = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    controllerName = controllerName.charAt(0).toLowerCase() + controllerName.slice(1);

    const fileName = `${controllerName}.controller.ts`;
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

      stream.write(`import { IAdd${modelName}Req, IGet${modelName}Req, IUpdate${modelName}Req } from "@/models/${modelName}.model";
import { Request, Response, RequestHandler } from "express";

export const index: RequestHandler = async (request: Request, response: Response) => {
    try {
        
    } catch (error) {
        console.error("[${controllerName}.controller.ts][index][error]: ", error);
        response.status(500).json({message: 'Error fetching ${controllerName}'});
    }
};

export const store: RequestHandler = async (request: IAdd${modelName}Req, response: Response) => {
    try {
        
    } catch (error) {
        console.error("[${controllerName}.controller.ts][store][error]: ", error);
        response.status(500).json({message: 'Error storing ${controllerName}'});
    }
};

//@ts-expect-error
export const updateById: RequestHandler = async (request: IUpdate${modelName}Req, response: Response) => {
    try {
        
    } catch (error) {
        console.error("[${controllerName}.controller.ts][update][error]: ", error);
        response.status(500).json({message: 'Error updating ${controllerName}'});
    }
};

//@ts-expect-error
export const destroyById: RequestHandler = async (request: IGet${modelName}Req, response: Response) => {
    try {
        
    } catch (error) {
        console.error("[${controllerName}.controller.ts][destroy][error]: ", error);
        response.status(500).json({message: 'Error destroying ${controllerName}'});
    }
};`);

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

