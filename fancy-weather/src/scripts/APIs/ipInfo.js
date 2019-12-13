export default async function ipInfo() {
  const response = await fetch('https://ipinfo.io?token=abb04b3b63728f');
  const json = await response.json();
  const lat = Number(json.loc.split(',')[0]);
  const lng = Number(json.loc.split(',')[1]);
  return [lat, lng];
}
