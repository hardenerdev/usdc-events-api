const dotenv = require('dotenv');
const app = require('./app');
require('./subscribers/transferevent');

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`+ app up and ready at port ${PORT}`);
});
