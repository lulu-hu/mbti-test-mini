import { View } from "@tarojs/components";
import { AtButton, AtRadio } from "taro-ui";
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import "./index.scss";
import GlobalFooter from "../../components/GlobalFooter";
import questions from "../../data/questions.json";



/**
 *  做题页面
 */
export default () => {
  // 当前题目序号（从1开始）
  const [current, setCurrent] = useState(1);
  // 当前题目
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const questionOptions = currentQuestion.options.map((option) => {
    return {
      label: `${option.key}. ${option.value}`,
      value: option.key,
    };
  });
  // 当前答案
  const [currentAnswer, setCurrentAnswer] = useState<String>();
  // 回答列表
  const [answerList] = useState<String[]>([]);
  // 序号变化时，切换当前题目和当前回答
  useEffect(() => {
    setCurrentQuestion(questions[current - 1]);
    setCurrentAnswer(answerList[current - 1]);
  }, [current]);
  return (
    <View className="doQuestionPage">
      <View className="at-article__h2 title">
        {current}、{currentQuestion.title}
      </View>
      <View className="options-wrapper">
        <AtRadio
          options={questionOptions}
          value={currentAnswer}
          onClick={(value) => {
            setCurrentAnswer(value);
            // 记录回答
            answerList[current - 1] = value;
          }}
        />
      </View>
      {current > 1 && (
        <AtButton
          type="primary"
          circle
          className="controBtn"
          onClick={() => setCurrent(current - 1)}
        >
          上一题
        </AtButton>
      )}
      {current < questions.length && (
        <AtButton
          type="primary"
          circle
          className="controBtn"
          disabled={!currentAnswer}
          onClick={() => setCurrent(current + 1)}
        >
          下一题
        </AtButton>
      )}
      {current === questions.length && (
        <AtButton
          type="primary"
          circle
          className="controBtn"
          disabled={!currentAnswer}
          onClick={() => {
            // 传递答案
            Taro.setStorageSync("answerList", answerList);
            // 跳转到结果页
            Taro.navigateTo({
              url: "/pages/result/index",
            });
          }}
        >
          查看结果
        </AtButton>
      )}
      <GlobalFooter />
    </View>
  );
};
