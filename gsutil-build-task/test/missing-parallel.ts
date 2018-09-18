import { TaskLibAnswers } from 'vsts-task-lib/mock-answer';
import { TaskMockRunner } from 'vsts-task-lib/mock-run';
import * as mock from 'common/register-mocks';
import * as path from 'path';

const taskpath = path.join(__dirname, '..', 'gsutil-build.js');
const runner = new TaskMockRunner(taskpath);

runner.setInput('serviceEndpoint', 'endpointId');
runner.setInput('command', 'mv');
runner.setInput('sourceUrl', 'src_uri');
runner.setInput('destinationUrl', 'dst_uri');

const jsonKeyFilePath = path.resolve('tempKeyFile.json');
const execString = '/mocked/tools/gsutil' +
	' -o' +
	` Credentials:gs_service_key_file=${jsonKeyFilePath}` +
	' mv' +
	' src_uri' +
	' dst_uri';

const answers: TaskLibAnswers = mock.getDefaultAnswers();

answers.exec[execString] = {
	'code': 0,
	'stdout': '[gsutil executed]',
	'stderr': '[gsutil output]',
};

runner.setAnswers(answers);
mock.registerCommonMocks(runner);
runner.run();