import app from './app.js';
import env from './config/config.js';

const { PORT } = env;

app.listen(PORT, () => {
  console.log(`IEIT SERVER IS RUNNING ON PORT ${PORT}`);
});
