import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';

// Function to shuffle the options
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
  const [loading, setLoading] = useState(true); // Add loading state

  const getQuiz = async () => {
    try {
      const url =
        'https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple&encode=url3986';
      const response = await fetch(url);
      const data = await response.json();
      setQuestions(data.results);
      setOptions(generateOptions(data.results[0]));
      setLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.error('Error fetching quiz data:', error);
      setLoading(false); // Ensure loading is false in case of error
    }
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
      // correct
      setScore(score + 10);
    } else {
      // incorrect
      setScore(score - 5);
    }
    if (ques === 9) {
      navigation.navigate('Result', {score});
    } else {
      handleNextPress(); // Move to the next question
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  // Calculate progress bar width
  const progressBarWidth = ((ques + 1) / questions.length) * 100;

  return (
    <View style={styles.container}>
      {questions.length > 0 ? (
        <View style={styles.parent}>
          <View style={styles.progressBarContainer}>
            <Text style={styles.progressText}>
              {ques + 1}/{questions.length}
            </Text>
            <View
              style={[styles.progressBar, {width: `${progressBarWidth}%`}]}
            />
          </View>
          <View style={styles.top}>
            <Text style={styles.question}>
              Q. {decodeURIComponent(questions[ques].question)}
            </Text>
          </View>
          <View style={styles.options}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleSelectedOption(option)}>
                <Text style={styles.optionText}>
                  {decodeURIComponent(option)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.bottom}>
            {ques < questions.length - 1 ? (
              <TouchableOpacity style={styles.button} onPress={handleNextPress}>
                <Text style={styles.buttonText}>SKIP QUESTION ➡️</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Result', {score})}>
                <Text style={styles.buttonText}>SHOW RESULTS</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ) : (
        <Text>No questions available</Text>
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
    justifyContent: 'center',
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
  progressBarContainer: {
    marginTop: 50,
    marginBottom: 25,
    height: 20, // Make the bar thicker
    backgroundColor: '#DDDBF1',
    borderRadius: 5,
    marginVertical: 16,
    position: 'relative',
    justifyContent: 'center', // Center the progress bar vertically
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3C4F76',
    borderRadius: 5,
  },
  progressText: {
    position: 'absolute',
    left: 10,
    top: -25, // Position above the progress bar
    fontSize: 16,
    fontWeight: '600',
    color: '#3C4F76',
  },
});
