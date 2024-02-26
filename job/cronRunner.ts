import cron from 'node-cron';

// Define the function you want to execute
const myFunction = () => {
  const now = new Date();
  const formattedTime = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now
    .getDate()
    .toString()
    .padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now
    .getMinutes()
    .toString()
    .padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
  console.log(`[${formattedTime}] This function is executed every minute.`);
};

function runCronJob() {
  // Schedule the function to run every minute
  cron.schedule('* * * * *', () => {
    myFunction();
  });
}

export default { run: runCronJob };
