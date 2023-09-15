import '../../components/styles.css';
import { execSync } from 'node:child_process';
import { ReactFlowOuter } from '../../components/ReactflowOuter';
import { dry } from '../../utils/validators';
import type { Dry } from '../../utils/types';

export const dynamic = 'force-dynamic';

export default function Content({ params }: { params: { task: string } }) {
  const taskName = decodeURIComponent(params.task);

  // Not totally sure why this is happening...?
  if (taskName === 'favicon.ico') {
    return null;
  }

  const command = `cd ../.. && turbo ${taskName} --dry=json`;
  let graph: Dry | null = null;

  try {
    const graphBuffer = execSync(command).toString();
    const rawGraph = JSON.parse(graphBuffer.toString());
    graph = dry.parse(rawGraph);
  } catch (error) {
    // @ts-expect-error We shippin'!
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    throw new Error(error.message);
  }

  const tasks = graph.tasks.filter(
    (graph) => graph.command !== '<NONEXISTENT>',
  );

  return <ReactFlowOuter activeTask={taskName} direction="LR" tasks={tasks} />;
}