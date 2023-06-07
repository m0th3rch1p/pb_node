import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

const schemaDir = path.join(__dirname, 'schemas');

const command = "mysql";
const args = [
    '-u', 
    process.env.MYSQL_USER || "root",
    '-p' + process.env.MYSQL_PASSWORD || "",
    'binasta_node',
];

const child = spawn(command, args);

child.stdout.on('data', (data) => {
    console.log(`Spawn stdout data: ${data}`);
});

child.stdin.on('data', (data) => {
    console.log(`Spawn stdin data: ${data}`);
});

child.stderr.on('data', (data) => {
    console.log(`Spawn stderr data: ${data}`);
});


fs.readdir(schemaDir, (err, files) => {
    if (err) {
        console.error(`Error reading directory: ${schemaDir}`);
        return;
    }

    files.forEach((file) => {
        //Make sure its an sql file
        if((file.split('.')[1]) === "sql") {
            const filename = path.join(__dirname, 'schemas', file); 
            
            
            const fileStream = fs.createReadStream(filename);
            fileStream.on('error', (err) => {
                console.error(`Error reading ${filename}: ${err}`);
            });

            fileStream.on('end', () => {
                fileStream.unpipe(child.stdin);
                fileStream.destroy();
            });

            fileStream.pipe(child.stdin);

            child.on('close', (code, signal) => {
                fileStream.unpipe(child.stdin);
                if (code === 0) {
                    console.log(`${filename} migrated successfully`);
                } else {
                    console.error(`Migration failed with code ${code} and signal ${signal}`);
                }

            });            
        }
        else {
            console.log(`${file} doesn't seem to be an sql file`);
        }
    });
})