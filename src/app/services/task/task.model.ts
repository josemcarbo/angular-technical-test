export interface Member {
  fullName: string;
  age: number;
  skills: string[];
}

export interface Task {
  id: number;
  title: string;
  due?: Date;
  completed: boolean;
  members?: Member[];
}
