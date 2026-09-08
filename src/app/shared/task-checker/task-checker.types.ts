export interface TaskCheckResult {
  passed: boolean;
  title: string;
  message: string;
  details?: string[];
}
