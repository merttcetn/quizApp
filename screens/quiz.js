import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';

// function to shuffle the options
const shuffleOptions = optionsArray => {
  for (let i = optionsArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [optionsArray[i], optionsArray[j]] = [optionsArray[j], optionsArray[i]];
  }
};

const Quiz = ({navigation}) => {
  const [questions, setQuestions] = useState([]);
  const [ques, setQues] = useState(0);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);

  const getQuiz = async () => {
    const url =
      'https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple&encode=url3986';
    const response = await fetch(url);
    const data = await response.json();
    setQuestions(data.results);
    setOptions(generateOptions(data.results[0]));
  };

  useEffect(() => {
    getQuiz();
  }, []);

  const handleNextPress = () => {
    if (ques < questions.length - 1) {
      setQues(ques + 1);
      setOptions(generateOptions(questions[ques + 1])); // Pass the next question object
    }
  };

  const generateOptions = _question => {
    const options = [..._question.incorrect_answers];
    options.push(_question.correct_answer);
    shuffleOptions(options);
    return options;
  };

  const handleSelectedOption = _option => {
    if (_option === questions[ques].correct_answer) {
      setScore(score + 10);
    }
    if (ques !== 9) {
      setQues(ques + 1);
      setOptions(generateOptions(questions[ques + 1]));
    }
  };

  return (
    <View style={styles.container}>
      {questions.length > 0 ? (
        <View style={styles.parent}>
          <View style={styles.top}>
            <Text style={styles.question}>
              Q. {decodeURIComponent(questions[ques].question)}
            </Text>
          </View>
          <View style={styles.options}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleSelectedOption(options[0])}>
              <Text style={styles.optionText}>
                {decodeURIComponent(options[0])}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleSelectedOption(options[1])}>
              <Text style={styles.optionText}>
                {decodeURIComponent(options[1])}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleSelectedOption(options[2])}>
              <Text style={styles.optionText}>
                {decodeURIComponent(options[2])}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleSelectedOption(options[3])}>
              <Text style={styles.optionText}>
                {decodeURIComponent(options[3])}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>SKIP</Text>
            </TouchableOpacity>
            {ques !== 9 && (
              <TouchableOpacity style={styles.button} onPress={handleNextPress}>
                <Text style={styles.buttonText}>NEXT</Text>
              </TouchableOpacity>
            )}
            {ques === 9 && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Result', {score: score})}>
                <Text style={styles.buttonText}>SHOW RESULTS</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  parent: {height: '100%'},
  container: {
    paddingTop: 40,
    paddingHorizontal: 16,
    height: '100%',
  },
  top: {marginVertical: 16, alignItems: 'center', justifyContent: 'center'},
  options: {marginVertical: 16, flex: 1},
  bottom: {
    marginBottom: 12,
    paddingVertical: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#3C4F76',
    padding: 12,
    paddingHorizontal: 36,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  buttonText: {fontSize: 18, fontWeight: '600', color: 'white'},
  question: {fontSize: 28, fontWeight: '600'},
  optionText: {fontSize: 18, fontWeight: '400'},
  optionButton: {
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 6,
    backgroundColor: '#DDDBF1',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
