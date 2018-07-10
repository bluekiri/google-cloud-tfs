import * as assert from 'assert';
import * as gcloudAssert from 'common/asserts';
import { toKebabCase } from 'common/strings';
import * as path from 'path';
import { MockTestRunner } from 'vsts-task-lib/mock-test';

describe('gsutil build task', () => {
	let runner: MockTestRunner;
	beforeEach(function (): void { runner = null; });

	afterEach(function (): void {
		if (this.currentTest.state === 'failed') {
			console.log(runner.stdout);
			console.log('--------------------');
			console.log(runner.stderr);
		}
	});

	it('should fail for no gsutil', () => {
		const testPath = path.join(__dirname, 'no-gsutil.js');
		runner = new MockTestRunner(testPath);
		runner.run();
	});

	describe('missing required parameters', () => {
		const requiredParameters: string[] = [
			'serviceEndpoint',
			'command',
			'sourceUrl',
			'destinationUrl'
		];

		for (const param of requiredParameters) {
			it(`should fail with missing ${param} parameter`, () => {
				const kebobed = toKebabCase(param);
				const testPath = path.join(__dirname, `missing-${kebobed}.js`);
				runner = new MockTestRunner(testPath);
				runner.run();

				gcloudAssert.assertGcloudNotRun(runner);
				assert(runner.stdOutContained(`Input required: ${param}`),
					`Should be looking for ${param}`);
			});
		}
	});
});