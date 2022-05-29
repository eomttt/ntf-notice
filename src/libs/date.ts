const ISO_8601_FULL = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i;

export const DATETIME_ISO_FORMAT = "yyyy-MM-dd'T'HH:mm";

export const DATETIME_ALARM_FORMAT = 'yyyy.MM.dd. HH:mm';

export const reviveDateTime = (key: any, value: any): any => {
  if (typeof value === 'string') {
    const regexResult = ISO_8601_FULL.exec(value);
    if (regexResult) {
      return new Date(value);
    }
  }

  return value;
};
