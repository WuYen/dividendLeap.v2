import { authorStatsProcessorInstance } from './business/AuthorStatsProcessor';

export async function newProcessAndUpdateAuthorStats(withInDays: number = 20): Promise<string> {
  const message = await authorStatsProcessorInstance.processAndUpdateAuthorStats(withInDays);
  return message;
}
