export type Project = {
  id: string;
  name: string;
  color: string;
  created_at: string;
};

export type Label = {
  id: string;
  name: string;
  color: string;
  created_at: string;
};

export type Chat = {
  id: string;
  name: string;
  avatar_url: string | null;
  phone_number: string;
  project_id: string | null;
  members_count: number;
  last_message: string | null;
  last_active: string;
  created_at: string;
};

export type ChatWithRelations = Chat & {
  project: Project | null;
  labels: Label[];
};
