// urlConfig.ts
const divisionMapping: { [key: string]: string } = {
    '001': 'https://icloud-sender.com/api/v1',
    '002': 'http://153.120.170.192:5000/api/v1',
    '003': 'https://22.22.22.22/api/v1',
    // Add more divisions as needed
  };
  
  export const getBackendUrl = (division: string): string | null => {
    return divisionMapping[division] || null;
  };