export type ApiResponseType = {
  ip: string;
  continent_code: string;
  continent_name: string;
  country_code2: string;
  country_code3: string;
  country_name: string;
  country_name_official?: string;
  country_capital: string;
  country_emoji?: string;
  state_prov: string;
  state_code?: string;
  district: string;
  city: string;
  zipcode: string;
  latitude: string;
  longitude: string;

  is_eu: boolean;

  calling_code: string;
  country_tld: string;
  languages: string;
  country_flag: string;
  geoname_id: string;
  isp: string;
  connection_type: string;
  organization: string;

  currency?: {
    code: string;
    name: string;
    symbol: string;
  };

  time_zone: {
    name: string;
    offset: number;
    current_time: string;
    current_time_unix: number;
    is_dst: boolean;
    dst_savings: number;
    current_tz_abbreviation?: string;
    current_tz_full_name?: string;
  };

  // Additional metadata added by RequestInfo
  resolved_from?: string;
  ping_ms?: number;
};
