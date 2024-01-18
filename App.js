import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const getMovies = async () => {
    try {
      const response = await fetch('https://bd88-2001-448a-40aa-2145-7d7d-d92e-9768-6f73.ngrok-free.app/api/quizzes/');
      const json = await response.json();
      setData(json.dataQuiz);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };



  const handleAnswerPress = (answer, correctAnswer) => {
    if (!showCorrectAnswer) {
      setSelectedAnswer(answer);
      setShowCorrectAnswer(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowCorrectAnswer(false);
  }

  const renderAnswerButton = (answer, label, correctAnswer) => {
    const isSelected = selectedAnswer === answer;
    const isCorrectAnswer = correctAnswer === selectedAnswer;

    return (
      <TouchableOpacity
        style={{
          borderRadius: 3,
          backgroundColor: isSelected
            ? isCorrectAnswer
              ? '#37CFFF'
              : '#FF3737'
            : '#EEEEEE',
          padding: 10,
          marginBottom: 3
        }}
        onPress={() => handleAnswerPress(answer, correctAnswer)}
        disabled={showCorrectAnswer}
      >
        <Text style={{
          color: selectedAnswer === answer ? '#EEEEEE' : '#343434'
        }}>
          {`${label}. ${answer}`}
        </Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={styles.container}>

      <View style={styles.headerGroup}>
        <View style={styles.garis} />
        <Image source={require('./assets/logo.png')} />
      </View>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View>
            {currentQuestionIndex < data.length && (
              <>
                <Text style={{
                  marginTop: 8, fontWeight: "bold"
                }}>
                  {data[currentQuestionIndex].id + '.'}{" "}
                  {data[currentQuestionIndex].quiz}
                </Text>
                {renderAnswerButton(
                  data[currentQuestionIndex].a,
                  'A',
                  data[currentQuestionIndex].key
                )}
                {renderAnswerButton(
                  data[currentQuestionIndex].b,
                  'B',
                  data[currentQuestionIndex].key
                )}
                {renderAnswerButton(
                  data[currentQuestionIndex].c,
                  'C',
                  data[currentQuestionIndex].key
                )}
                {renderAnswerButton(
                  data[currentQuestionIndex].d,
                  'D',
                  data[currentQuestionIndex].key
                )}

                {showCorrectAnswer && (
                  <Text style={{
                    color: "#343434",
                    marginTop: 8,
                    fontWeight: 'bold'
                  }}>
                    Jawaban yang benar: {data[currentQuestionIndex].key}
                  </Text>
                )}

                <Text style={{ color: '#343434' }}>Jawaban kamu: {selectedAnswer}</Text>
              </>
            )}
          </View>
          {showCorrectAnswer && (
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#343434',
                  padding: 10,
                  borderRadius: 3,
                  marginTop: 8
                }}
                onPress={() => {
                  if (currentQuestionIndex + 1 < data.length) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                    setSelectedAnswer(null)
                    setShowCorrectAnswer(false);
                  } else {
                    handleRestart();
                  }
                }}>
                <Text style={{ color: '#EEEEEE' }}>
                  Quiz Selanjutnya
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  headerGroup: {
    marginTop: 50,
    gap: 7,
  },
  garis: {
    height: 2,
    backgroundColor: "#000000",
    borderRadius: 5
  },
  quizSesion: {
    marginTop: 15
  },
  quizGroup: {

  },
  quizQuestion: {
    marginBottom: 3
  },
  question: {

  },
  answerGroup: {
    gap: 5
  },
  answerOptions: {
    backgroundColor: "#E5E5E5",
    paddingVertical: 10,
    paddingLeft: 10
  },
  quizKey: {
    marginTop: 5,
  },
  quizKeyValue: {
    fontWeight: "500"
  },
  selectedAnswer: {
    backgroundColor: "grey",
    paddingVertical: 10,
    paddingLeft: 10
  }
})