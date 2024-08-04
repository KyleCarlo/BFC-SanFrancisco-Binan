import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import isLeapYear from "dayjs/plugin/isLeapYear";

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(isLeapYear);

export default dayjs;
