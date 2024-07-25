// 用户提交的答案
const answerList = ["A"];

// 题目列表
const questions = [
  {
    "title": "你通常更喜欢",
    "options": [
      {
        "result": "I",
        "value": "独自工作",
        "key": "A"
      },
      {
        "result": "E",
        "value": "与他人合作",
        "key": "B"
      }
    ]
  }
];

// 题目评分结果
const question_results = [
  {
    "resultProp": ["I", "S", "T", "J"],
    "resultDesc": "忠诚可靠，被公认为务实，注重细节。",
    "resultPicture": "icon_url_istj",
    "resultName": "ISTJ（物流师）"
  }
];

/**
 * 根据用户答案计算与题目评分结果的匹配度。
 * @param {Array} answers - 用户提交的答案列表。
 * @param {Array} questions - 题目列表。
 * @param {Array} results - 题目评分结果列表。
 * @returns {Object} 得分最高的题目评分结果。
 */
// eslint-disable-next-line @typescript-eslint/no-shadow
export function calculateHighestScore(answers, questions, results) {
  // 初始化一个空对象来存储每个结果的得分
  const scores = {};

  // 遍历每一个题目评分结果
  results.forEach(result => {
    // 初始得分为0
    let score = 0;

    // 遍历用户答案
    answers.forEach((answer, index) => {
      // 找到与用户答案对应的题目选项
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const option = questions[index].options.find(option => option.key === answer);

      // 如果找到了选项并且结果集合中包含该选项的结果，则得分+1
      if (option && result.resultProp.includes(option.result)) {
        score++;
      }
    });

    // 将结果和得分添加到scores对象中
    scores[result.resultName] = score;
  });

  // 寻找得分最高的结果
  let highestScoreResult = results[0];
  let highestScore: unknown = 0;

  for (const [resultName, score] of Object.entries(scores)) {
    // @ts-ignore
    if (score > highestScore) {
      highestScore = score;
      highestScoreResult = results.find(result => result.resultName === resultName);
    }
  }

  return highestScoreResult;
}

// 调用函数并打印结果
const bestMatch = calculateHighestScore(answerList, questions, question_results);
console.log(bestMatch);


