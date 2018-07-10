import { TaskLibAnswers } from 'vsts-task-lib/mock-answer';
import { TaskMockRunner } from 'vsts-task-lib/mock-run';
import * as mock from 'common/register-mocks';
import * as path from 'path';

const taskpath = path.join(__dirname, '..', 'gsutil-build.js');
const runner = new TaskMockRunner(taskpath);

runner.setInput('serviceEndpoint', 'endpointId');
runner.setInput('command', 'mv');
runner.setInput('destinationUrl', 'dst_uri');

const answers: TaskLibAnswers = mock.getDefaultAnswers();

runner.setAnswers(answers);
mock.registerCommonMocks(runner);
runner.run();