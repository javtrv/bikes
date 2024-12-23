interface SeedCategory {
  id: string;
  name: string;
  order: number;
  products?: string[];
}

export const initialCategories: SeedCategory[] = [
  { name: 'Frame Type', products: [], order:1, id:'d12a567b-dc7b-4287-a733-883b94377fbe' },
  { name: 'Frame Finish', products: [], order:2, id:'3d4124a2-1a73-4a86-9065-ff0dbf58cdfd' },
  { name: 'Wheels', products: [], order:3, id:'8009a868-7fc5-4d64-892f-30b4506c3ada'},
  { name: 'Rim color', products: [], order:4, id:'c7aeaf4f-96fc-468d-97aa-388214b5dfa3'},
  { name: 'Chain', products: [], order:5, id:'b8a52c01-e35b-4676-b8d5-1e7956288f74' },
]