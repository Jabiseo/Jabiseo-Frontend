let problems = [];

for (let i = 0; i < 20; i++) {
  let newProblem = {
    problemId: `${i + 1}`,
    examInfo: {
      examId: `${i + 1}`,
      description: `${2020 + i}년 ${i}회차`,
    },
    subject: {
      subjectId: `${i + 1}`,
      name: `소프트웨어 설계 ${i + 1}`,
      sequence: i + 1,
    },
    isBookmark: true,
    description: `인터페이스 구현 검증도구 중 아래에서 설명하는 것은?<br>`,
    choices: [
      `빌드 검증 ${i + 1}<br>`,
      `동료 검토 ${i + 1}<br>`,
      `워크 스루 ${i + 1}<br>`,
      `개발자 검토 ${i + 1}<br>`,
    ],
    answerNumber: (i % 4) + 1,
    theory: `검토회의 전에 요구사항 명세서를 미리 배포하여 사전 검토한 후 짧은 검토 회의를 통해 오류를 조기에 검출하는데 목적을 두는 요구 사항 검토 방법은? ${
      i + 1
    }<br>`,
    solution: `검토회의 전에 요구사항 명세서를 미리 배포하여 사전 검토한 후 짧은 검토 회의를 통해 오류를 조기에 검출하는데 목적을 두는 요구 사항 검토 방법은? ${
      i + 1
    }<br>`,
  };
  problems.push(newProblem);
}
const getProblems = () => {
  const newProblems = problems.map(problem => {
    return { ...problem, chooseNumber: 0, viewSolution: false, viewTheory: false };
  });
  return newProblems;
};

export { getProblems };
