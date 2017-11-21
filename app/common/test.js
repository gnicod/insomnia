// @flow

export type ResponseTestRunner = {
  name: string,
  fn: string
}
class Runner {
  constructor () {
    this.tests = [];
    this.testsResults = [];
  }

  test (name, fn) {
    this.tests.push({name, fn});
  }

  run () {
    console.log('tests', this.tests);
    for (let i = 0; i < this.tests.length; i++) {
      let test = this.tests[i];
      try {
        test.fn();
      } catch (err) {
        this.testsResults.push({
          name: test.name,
          isSuccess: false,
          message: err.message
        });
        continue;
      }
      this.testResults.push({
        name: test.name,
        isSuccess: true,
        message: ''
      });
    }
  }

  getResults () {
    return this.testsResults;
  }
}

export function getTestsResults (renderedRequest, response, bodyBuffer): Array<ResponseTestResult> {
  let chai = require('chai');
  let should = chai.should();
  console.log('response', response);

  // TODO sucks if xml
  const body = JSON.parse(bodyBuffer.toString());

  console.log('gettestresults');
  const runner = new Runner();
  const testScript = renderedRequest.testScript;

  const testFN = new Function('chai', 'should', 'body', 'runner', testScript);
  testFN(chai, should, body, runner, testScript);
  runner.run();
  return runner.getResults();
}
