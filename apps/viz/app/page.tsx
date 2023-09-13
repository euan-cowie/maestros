import '../components/styles.css';
import { execSync } from 'node:child_process';
import { Suspense } from 'react';
import { ReactFlowOuter } from '../components/ReactflowOuter';
import { dry } from '../utils/validators';

export const dynamic = 'force-dynamic';

export default function Page() {
  const taskName = 'lint';
  const graphBuffer = execSync(`cd ../.. && turbo lint --dry=json`).toString();
  const rawGraph = JSON.parse(graphBuffer.toString());
  const graph = dry.parse(rawGraph);
  const tasks = graph.tasks.filter(
    (graph) => graph.command !== '<NONEXISTENT>',
  );

  return (
    <Suspense fallback={<div>loadinggggg</div>}>
      <ReactFlowOuter activeTask={taskName} direction="LR" tasks={tasks} />;
    </Suspense>
  );
}
