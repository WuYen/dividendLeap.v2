export function getRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

export function delay(time: number | number[]): Promise<string> {
  let timeout = Array.isArray(time) ? getRandomIntInclusive(time[0], time[1]) : time;

  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve('continue');
    }, timeout);
  });
}
