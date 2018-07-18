import { Endpoint, getQuietExecOptions } from 'common/exec-options';
import * as task from 'vsts-task-lib/task';
import { catchAll } from 'common/handle-rejection';
import { IExecOptions } from 'vsts-task-lib/toolrunner';

async function run(): Promise<void> {
	const gsutilPath = task.which('gsutil', true);

	const endpointId = task.getInput('serviceEndpoint', true);
	const command = task.getInput('command', true);
	const isMoveOrCopyCommand = command === 'mv' || command === 'cp';

	const sourceUrl = task.getInput('sourceUrl', isMoveOrCopyCommand);
	const destinationUrl = task.getInput('destinationUrl', isMoveOrCopyCommand);

	const enableParallelProcessing = task.getBoolInput('parallel');
	const extraOptions = task.getInput('options');

	const endpoint = new Endpoint(endpointId);
	
	const gsutil = task.tool(gsutilPath)
		.argIf(enableParallelProcessing, '-m')
		.line(`-o Credentials:gs_service_key_file=${Endpoint.jsonKeyFilePath}`)
		.arg(command)
		.line(extraOptions)
		.argIf(isMoveOrCopyCommand, sourceUrl)
		.argIf(isMoveOrCopyCommand, destinationUrl);

	const execOptions: IExecOptions = getQuietExecOptions();

	await endpoint.usingAsync(async () => {
		await gsutil.exec(execOptions);
		task.setResult(task.TaskResult.Succeeded, 'Command executed');
	});
}

catchAll(run());