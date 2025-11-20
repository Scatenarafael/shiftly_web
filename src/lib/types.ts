export type PaginationProps = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalCount: number;
  perPage: number;
  pageIndex: number;
};

export type Paginated<T> = {
  meta: {
    totalCount: number;
    perPage: number;
    pageIndex: number;
  };
  results: T[];
};

export type ProfileResponseProps = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
};

export type ParentDetailsProps = {
  id: number;
  name: string;
};

export type RegionsResponseItem = {
  id: number;
  name: string;
  parent: ParentDetailsProps | null;
  notes: string;
  users: ProfileResponseProps[];
  children: RegionsResponseItem[];
};

export const userRoles: Record<number, string> = {
  0: 'Guest',
  1: 'Operator',
  2: 'Administrator',
  3: 'Mantainer',
};

export const potentialDamage: Record<number, string> = {
  0: 'NO EMERGENCY',
  1: 'Moderate',
  2: 'High',
  3: 'Critical',
};
export const riskyCategory: Record<number, string> = {
  0: 'NO RISK',
  1: 'Moderate',
  2: 'High',
  3: 'Critical',
};
