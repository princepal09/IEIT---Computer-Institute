import app from './app.js';
import environment from './config/config.js';


app.listen(environment.PORT, () => {
  console.log(`IEIT SERVER IS RUNNING ON PORT ${environment.PORT}`);
});
