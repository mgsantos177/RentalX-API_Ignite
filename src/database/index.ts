import { createConnection, getConnectionOptions } from 'typeorm';

interface IOption {
  host: string;
}

getConnectionOptions().then(options => {
  const newOptions = options as IOption;
  newOptions.host = 'database';
  createConnection({
    ...options
  });
});
