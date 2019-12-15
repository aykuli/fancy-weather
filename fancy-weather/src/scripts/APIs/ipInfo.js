import { ipInfoKey } from './apiKeys.js';

export default async function ipInfo() {
  const response = await fetch(`https://ipinfo.io?token=${ipInfoKey}`);
  const json = await response.json();
  const lat = Number(json.loc.split(',')[0]);
  const lng = Number(json.loc.split(',')[1]);
  return [lat, lng];
}
