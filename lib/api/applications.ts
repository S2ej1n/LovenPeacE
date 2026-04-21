export interface ApplicationPayload {
  teamName: string;
  leader: string;
  phone: string;
  members: string;
  genre: string;
  privacy: true;
}

export async function submitApplication(data: ApplicationPayload): Promise<void> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}
