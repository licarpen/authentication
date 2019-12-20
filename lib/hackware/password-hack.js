const lineReader = require('line-reader');
const bcrypt = require('bcryptjs');

const realHash = bcrypt.hashSync('123456', 1);

lineReader.open('../assets/top-5000-passwords.txt', function(err, reader) {
  if(reader.hasNextLine()){
    reader.nextLine(function(line) {
      console.log(line);
      if(bcrypt.compareSync(line, realHash)) return true;
    });
  }
  return false;
});
