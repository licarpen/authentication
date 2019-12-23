const bcrypt = require('bcryptjs');
const fs = require('fs');
const readline = require('readline');
const realHash = bcrypt.hashSync('23232323', 1);

const hackPassword = () => {
  return new Promise((resolve, reject) => {
    const readInterface = readline.createInterface({
      input: fs.createReadStream('../assets/10-million-password-list-top-100000.txt', { highwaterMark: 512 }),
      console: false
    });
    readInterface.on('line', function(line) {
      if(bcrypt.compareSync(line, realHash)) {
        resolve(line);
        readInterface.close();
      }
    });
    readInterface.on('end', function() {
      reject();
    });
  });
};

// eslint-disable-next-line no-console
hackPassword().then(console.log);
