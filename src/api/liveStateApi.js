export async function fetchLiveState() {
  const response = await fetch('/api/live-state');

  if (!response.ok) {
    throw new Error(`Failed to fetch live state: ${response.status}`);
  }

  return response.json();
}

