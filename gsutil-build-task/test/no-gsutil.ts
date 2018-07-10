import { TaskLibAnswers } from 'vsts-task-lib/mock-answer';
import { TaskMockRunner } from 'vsts-task-lib/mock-run';
import * as mock from 'common/register-mocks';
import * as path from 'path';

const taskpath = path.join(__dirname, '..', 'gsutil-build.js');
const runner = new TaskMockRunner(taskpath);
const answers: TaskLibAnswers = {
	which: {
		'gsutil': mock.gsutilPath		
	},
	checkPath: {
		[mock.gsutilPath]: false
	},
};

runner.setAnswers(answers);
mock.registerCommonMocks(runner);
runner.run();

