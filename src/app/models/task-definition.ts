export type TaskDifficulty = 'Einfach' | 'Mittel' | 'Anspruchsvoll';

export interface WorkshopTask {
  id: string;
  number: number;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  concept: string;
  difficulty: TaskDifficulty;
  estimatedMinutes: string;
  filePath: string;
  problem: string;
  goal: string;
  constraints: string[];
  hints: string[];
  successExplanation: string;
}
