interface IPResponse {
  ip: string;
}

interface LocationResponse {
  ipVersion: number;
  ipAddress: string;
  latitude: number;
  longitude: number;
  countryName: string;
  countryCode: string;
  timeZone: string;
  zipCode: string;
  cityName: string;
  regionName: string;
  isProxy: boolean;
}

export async function getIPAddress(): Promise<string> {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    if (!response.ok) throw new Error('Failed to fetch IP');
    const data: IPResponse = await response.json();
    return data.ip;
  } catch (error) {
    console.error('IP fetch error:', error);
    throw new Error('Unable to retrieve IP address');
  }
}

export async function getLocationData(ip: string) {
  try {
    const response = await fetch(`https://freeipapi.com/api/json/${ip}`);
    if (!response.ok) throw new Error('Failed to fetch location');
    const data: LocationResponse = await response.json();
    
    const localTime = new Date().toLocaleTimeString('en-US', {
      timeZone: data.timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });

    return {
      city: data.cityName,
      region: data.regionName,
      country: data.countryName,
      timezone: data.timeZone,
      lat: data.latitude,
      lon: data.longitude,
      localTime,
      isp: data.isProxy ? 'Proxy Detected' : 'Direct Connection',
      ipVersion: data.ipVersion
    };
  } catch (error) {
    console.error('Location fetch error:', error);
    throw new Error('Unable to retrieve location data');
  }
}