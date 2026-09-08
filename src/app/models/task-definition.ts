export type TaskDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

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
