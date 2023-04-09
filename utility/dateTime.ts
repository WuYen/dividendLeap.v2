export function getTodayWithTZ(tz = 8) {
  // create Date object for current location
  var d = new Date();
  // get UTC time in msec
  var utc = d.getTime() + d.getTimezoneOffset() * 60000;
  // create new Date object for different city using supplied offset
  var nd = new Date(utc + 3600000 * tz);

  return nd;
}

/** get today in yyyymmdd */
export function today() {
  var today = getTodayWithTZ();
  var todayStr = toDateString(today);
  return todayStr;
}

export function latestTradeDate(): string {
  const today = getTodayWithTZ();
  const day = today.getDay();
  // Sunday - Saturday : 0 - 6
  if (day == 1) {
    //周一
    if (today.getHours() < 14) {
      today.setDate(today.getDate() - 3); // -3 => 週五
    }
  } else if (day == 0) {
    //週日
    today.setDate(today.getDate() - 2); // -2 => 週五
  } else if (day == 6) {
    //週六
    today.setDate(today.getDate() - 1); // -2 => 週五
  } else {
    //周一 ~ 周五
    if (today.getHours() < 14) {
      today.setDate(today.getDate() - 1);
    }
  }

  let result = toDateString(today);

  if (result === '20210614') {
    result = '20210611';
  }
  return result;
}

/**
 * 從 Today 到過去 n 個月 的日期範圍
 * @param {Number} n 從 Today 到過去 n 個月
 * @returns [20210101,20211011]
 */
export function getMonthRange(n = 1) {
  const end = getTodayWithTZ();
  const start = getTodayWithTZ();
  start.setMonth(start.getMonth() - n);

  return [toDateString(start), toDateString(end)];
}

/** 取得yyyymmdd */
export function toDateString(date: string | Date) {
  const { year, month, day } = getDateFragment(date);
  return `${year}${month}${day}`;
}

export function parseChineseDate(str: string) {
  return `${+getPureDate(str) + 19110000}`;
}

export function getDateFragment(date: string | Date) {
  if (typeof date == 'string') {
    return {
      year: date.substr(0, 4),
      month: date.substr(4, 2),
      day: date.substr(6, 2),
    };
  } else {
    return {
      year: date.getFullYear().toString(),
      month: `${('0' + (date.getMonth() + 1)).slice(-2)}`,
      day: `${('0' + date.getDate()).slice(-2)}`,
    };
  }
}

export function getPureDate(str: string) {
  return str.replace(/\D/g, '');
}
