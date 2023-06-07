import fs from 'fs';
import path from 'path';

const fileName = `${Date.now()}_${process.env.npm_config_dbName}_table.sql`;
const filePath = path.join(__dirname, 'schemas', fileName);

fs.open(filePath, 'wx', (err, fd) => {
  if (err) {
    if (err.code === 'EEXIST') {
      console.log('Migration file already exists.');
    } else {
      console.error(`Error opening migration file: ${err}`);
    }
    return;
  }

  const stream = fs.createWriteStream('', {fd});

  stream.write(`CREATE TABLE IF NOT EXISTS ${process.env.npm_config_dbName}(
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(id)
  );`);

  stream.end();

  stream.on('finish', () => {
    console.log('Migration file created successfully.');
    fs.close(fd, (closeErr) => {
      if (closeErr) {
        console.error(`Error closing migration file: ${closeErr}`);
      }
    });
  });

  stream.on('error', (err) => {
    console.error(`Error writing to migration file: ${err}`);
    fs.close(fd, (closeErr) => {
      if (closeErr) {
        console.error(`Error closing migration file: ${closeErr}`);
      }
    });
  });
});
