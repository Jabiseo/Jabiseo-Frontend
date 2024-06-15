const problem = [
  {
    problemId: 1,
    examInfo: {
      examId: 1,
      year: 2021,
      round: 1,
    },
    subject: {
      subjectId: 1,
      name: "소프트웨어 설계",
    },
    isBookmark: true,
    description:
      "인터페이스 구현 검증도구 중 아래에서 설명하는 것은?<br>     <br>![20년_1,2회차 24번](https://storage.googleapis.com/machuda/hwp/2023-04-19T15:33:32.334471)<br>",
    choices: ["빌드 검증<br>", "동료 검토<br>", "워크 스루<br>", "개발자 검토<br>"],
    answerNumber: 3,
    theory:
      "검토회의 전에 요구사항 명세서를 미리 배포하여 사전 검토한 후 짧은 검토 회의를 통해 오류를 조기에 검출하는데 목적을 두는 요구 사항 검토 방법은?<br>",
    solution:
      "검토회의 전에 요구사항 명세서를 미리 배포하여 사전 검토한 후 짧은 검토 회의를 통해 오류를 조기에 검출하는데 목적을 두는 요구 사항 검토 방법은?<br>",
  },
  {
    problemId: 1,
    examInfo: {
      examId: 1,
      year: 2022,
      round: 1,
    },
    subject: {
      subjectId: 1,
      name: "소프트웨어 설계",
    },
    isBookmark: true,
    description:
      "아무튼 다른 문제<br>![20년_1,2회차 24번](https://storage.googleapis.com/machuda/hwp/2023-04-19T15:33:32.334471)<br>",
    choices: ["빌드 검증<br>", "동료 검토<br>", "워크 스루<br>", "개발자 검토<br>"],
    answerNumber: 3,
    theory:
      "검토회의 전에 요구사항 명세서를 미리 배포하여 사전 검토한 후 짧은 검토 회의를 통해 오류를 조기에 검출하는데 목적을 두는 요구 사항 검토 방법은?<br>",
    solution:
      "검토회의 전에 요구사항 명세서를 미리 배포하여 사전 검토한 후 짧은 검토 회의를 통해 오류를 조기에 검출하는데 목적을 두는 요구 사항 검토 방법은?<br>",
  },
];
const getProblems = () => {
  const problems = [
    ...problem,
    ...problem,
    ...problem,
    ...problem,
    ...problem,
    ...problem,
    ...problem,
    ...problem,
    ...problem,
    ...problem,
    ...problem,
    ...problem,
    ...problem,
    ...problem,
    ...problem,
  ];
  const newProblems = problems.map(problem => {
    return { ...problem, chooseNumber: 0 };
  });
  return newProblems;
};

export { getProblems };
