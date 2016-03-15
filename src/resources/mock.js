
export function testCode(language, code) {
  return new Promise((resolve, reject) => {
    console.log('Testing');

    window.setTimeout(() => {
      // On tient la promesse !
      resolve({
        success: true,
        timeMs: 304,
        stdout: 'BLABLABLABLA',
      });
    }, 3000);
  });
}
