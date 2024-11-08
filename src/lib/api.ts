// Define the Chambre type
type Chambre = {
  idChambre?: number;
  numeroChambre: number;
  typeC: string;
  // Add other fields as necessary, such as bloc or reservations if needed
};

const API_BASE_URL = 'http://192.168.50.4:8089/tpfoyer/chambre'; // Adjust this to match your Spring Boot API URL

// Fetch all chambres
export async function getChambres(): Promise<Chambre[]> {
  const response = await fetch(`${API_BASE_URL}/retrieve-all-chambres`);
  if (!response.ok) {
    throw new Error('Failed to fetch chambres');
  }
  return response.json();
}

// Fetch a single chambre by ID
export async function getChambre(id: string): Promise<Chambre> {
  const response = await fetch(`${API_BASE_URL}/retrieve-chambre/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch chambre');
  }
  return response.json();
}

// Add a new chambre
export async function addChambre(chambre: Omit<Chambre, 'idChambre'>): Promise<Chambre> {
  const response = await fetch(`${API_BASE_URL}/add-chambre`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(chambre),
  });
  if (!response.ok) {
    throw new Error('Failed to add chambre');
  }
  return response.json();
}

// Update an existing chambre
export async function updateChambre(chambre: Chambre): Promise<Chambre> {
  const response = await fetch(`${API_BASE_URL}/modify-chambre`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(chambre),
  });
  if (!response.ok) {
    throw new Error('Failed to update chambre');
  }
  return response.json();
}

// Delete a chambre
export async function deleteChambre(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/remove-chambre/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete chambre');
  }
}

// Find chambres by type
export async function findChambresByType(type: string): Promise<Chambre[]> {
  const response = await fetch(`${API_BASE_URL}/trouver-chambres-selon-typ/${type}`);
  if (!response.ok) {
    throw new Error('Failed to fetch chambres by type');
  }
  return response.json();
}

// Find chambre by student CIN
export async function findChambreByStudentCin(cin: number): Promise<Chambre> {
  const response = await fetch(`${API_BASE_URL}/trouver-chambre-selon-etudiant/${cin}`);
  if (!response.ok) {
    throw new Error('Failed to fetch chambre by student CIN');
  }
  return response.json();
}