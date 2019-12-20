const bcrypt = require('bcryptjs');
const fs = require('fs');
const realHash = bcrypt.hashSync('123456', 1);

const hackPassword = () => {



}

fs.readFile('../assets/top-5000-passwords.txt', 'utf8', (err, data){
  
}





  // get next line here
      console.log(line);
      if(bcrypt.compareSync(line, realHash)) return true;
});
  }
  return false;
});
