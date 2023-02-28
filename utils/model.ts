export type Posts = {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type Comments = Partial<Posts>;

export enum CommentEnum {
  description = "description",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  action = "action",
}

export type Cols = {
  title: string;
  key: string;
  dataIndex: string;
  sortable?: boolean;
  width?: string | number;
  fixed?: "right" | "left";
  filter?: boolean;
  searchtype?: "text" | "date" | "select";
  render?: (value: string, record: any) => void;
};

export enum CrudType {
  ADD = "ADD",
  EDIT = "EDIT",
  DELETE = "DELETE",
}
