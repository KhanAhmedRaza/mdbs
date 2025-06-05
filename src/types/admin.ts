export interface Store {
  id: number;
  name: string;
}

export interface Equipment {
  id: number;
  name: string;
  quantity: number;
  condition: 'New' | 'Good' | 'Needs Replacement';
  location: string;
  type: string;
} 