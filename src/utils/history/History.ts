import dayjs from "dayjs";
import { History } from "../models/History";

type addToHistoryProps = {
  location: string;
  locationShort: string;
  ip?: string;
  isp?: string;
};

export const LocalStorageKey = "History";

export function AddToHistory({ location, locationShort, ip, isp }: addToHistoryProps) {
  const now = dayjs();
  const time = now.format("HH:mm");
  const today = now.format("DD MMMM YYYY");

  const currentConnection: History = {
    Location: location,
    LocationShort: locationShort,
    Time: time,
    IP: ip,
    ISP: isp,
    Timestamp: Date.now(),
  };

  let localStorageString = window.localStorage.getItem(LocalStorageKey);
  if (!localStorageString) localStorageString = "{}";

  try {
    const localStorageObject = JSON.parse(localStorageString);
    if (localStorageObject[today]) {
      const existing = localStorageObject[today] as History[];
      const isDuplicate = existing.length > 0 && existing[existing.length - 1].IP === ip;
      if (!isDuplicate) {
        existing.push(currentConnection);
      }
    } else {
      localStorageObject[today] = [currentConnection];
    }

    window.localStorage.setItem(
      LocalStorageKey,
      JSON.stringify(localStorageObject)
    );
  } catch (e) {
    console.error("Failed to update history in localStorage", e);
  }
}

export function GetHistory<TOutput>() {
  try {
    const raw = window.localStorage.getItem(LocalStorageKey);
    return raw ? (JSON.parse(raw) as TOutput) : ({} as TOutput);
  } catch (e) {
    return {} as TOutput;
  }
}

export function ClearHistory() {
  window.localStorage.removeItem(LocalStorageKey);
}
