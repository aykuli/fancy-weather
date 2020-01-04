import { ipInfoKey } from './apiKeys.js';

export default async function ipInfo() {
  const response = await fetch(`https://ipinfo.io?token=${ipInfoKey}`);
  const json = await response.json();
  const [lat, lng] = json.loc.split(',');
  return [Number(lat), Number(lng)];
}
