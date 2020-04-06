const ConfigItem = require('./models/ConfigItem');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

test = new ConfigItem('test2', 'test')
test.addToDb();