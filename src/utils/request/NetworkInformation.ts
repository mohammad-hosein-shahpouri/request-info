import { ApiResponseType } from "../models/ApiResponse";

// Check if string is IPv4 or IPv6
export function isIpAddress(str: string): boolean {
  const clean = str.trim();
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^([0-9a-fA-F]{1,4}:){1,7}:|^:((:[0-9a-fA-F]{1,4}){1,7}|:)$/;
  return ipv4Regex.test(clean) || ipv6Regex.test(clean);
}

// Resolve domain to IP via Google DNS-over-HTTPS
export async function resolveDomainToIp(domain: string): Promise<string> {
  const cleanDomain = domain.replace(/^https?:\/\//i, "").split("/")[0].trim();
  const res = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(cleanDomain)}&type=A`);
  if (!res.ok) {
    throw new Error(`DNS resolution failed for ${cleanDomain}`);
  }
  const json = await res.json();
  if (json.Answer && json.Answer.length > 0) {
    const aRecord = json.Answer.find((a: any) => a.type === 1);
    if (aRecord && aRecord.data) {
      return aRecord.data;
    }
  }
  throw new Error(`Could not resolve domain '${cleanDomain}' to an IP address.`);
}

export async function GetInfoAsync(target?: string): Promise<ApiResponseType> {
  const url = import.meta.env.VITE_INFO_URL as string;
  const apiKey = import.meta.env.VITE_API_KEY as string;

  let queryIp = "";
  let resolvedFrom: string | undefined;

  if (target && target.trim().length > 0) {
    const trimmed = target.trim();
    if (isIpAddress(trimmed)) {
      queryIp = trimmed;
    } else {
      resolvedFrom = trimmed.replace(/^https?:\/\//i, "").split("/")[0];
      queryIp = await resolveDomainToIp(resolvedFrom);
    }
  }

  const endpoint = queryIp
    ? `${url}${apiKey}&ip=${encodeURIComponent(queryIp)}`
    : `${url}${apiKey}`;

  const startTime = performance.now();
  const request = await fetch(endpoint, {
    method: "GET",
  });
  const endTime = performance.now();
  const pingMs = Math.round(endTime - startTime);

  if (!request.ok) {
    throw new Error(`Failed to fetch IP information (HTTP ${request.status})`);
  }

  const data = (await request.json()) as any;

  if (data.message && !data.ip) {
    throw new Error(data.message);
  }

  data.ping_ms = pingMs;
  if (resolvedFrom) {
    data.resolved_from = resolvedFrom;
  }

  return data as ApiResponseType;
}

export const DEMO_DATA: ApiResponseType = {
  ip: "8.8.8.8",
  continent_code: "NA",
  continent_name: "North America",
  country_code2: "US",
  country_code3: "USA",
  country_name: "United States",
  country_name_official: "United States of America",
  country_capital: "Washington, D.C.",
  country_emoji: "🇺🇸",
  state_prov: "California",
  state_code: "US-CA",
  district: "Santa Clara",
  city: "Mountain View",
  zipcode: "94043-1351",
  latitude: "37.42240",
  longitude: "-122.08421",
  is_eu: false,
  country_flag: "https://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg",
  geoname_id: "6301403",
  calling_code: "+1",
  country_tld: ".us",
  languages: "en-US,es-US,haw,fr",
  isp: "Google LLC",
  connection_type: "Fiber / Cloud",
  organization: "Google Public DNS",
  currency: {
    code: "USD",
    name: "US Dollar",
    symbol: "$",
  },
  time_zone: {
    name: "America/Los_Angeles",
    offset: -8,
    current_time: new Date().toISOString(),
    current_time_unix: Math.floor(Date.now() / 1000),
    is_dst: false,
    dst_savings: 0,
    current_tz_abbreviation: "PST",
    current_tz_full_name: "Pacific Standard Time",
  },
  ping_ms: 22,
};
