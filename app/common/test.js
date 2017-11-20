// @flow

export type ResponseTestRunner = {
  name: string,
  fn: string
}

function getTestsResults (response, bodyBuffer): Array<ResponseTestResult> {
  let chai = require('chai');
  let should = chai.should();
  console.log('response', response);

  // TODO sucks if xml
  const body = JSON.parse(bodyBuffer.toString());

  console.log('gettestresult');
  console.log(renderedRequest.testScript);
  const testScript = renderedRequest.testScript;

  const chaiScript = `
  try {
    ${testScript}
  }
  catch(err) {
    console.log(err)
  }
  `;
  const testFN = new Function('chai', 'should', 'body', chaiScript);
  testFN(chai, should, body, chaiScript);

  // eval(renderedRequest.testScript);
  return [{name: 'lol'}];
}
