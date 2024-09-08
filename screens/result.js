import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Title from '../components/title';

const Result = ({navigation, route}) => {
  const {score} = route.params;
  return (
    <View style={styles.container}>
      <Title titleText="Results 🏆" />
      <Text style={styles.scoreValue}>Score: {score} points</Text>
      <View style={styles.bannerContainer}>
        <Image
          source={
            score > 50
              ? require('../images/Achievement-rafiki.png')
              : require('../images/Business-failure-rafiki.png')
          }
          style={styles.banner}
          resizeMode="contain"
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.button}>
          <Text style={styles.buttonText}>
            {score > 50 ? 'ONE MORE TIME? 🤔' : 'TRY AGAIN! 😂'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 16,
    height: '100%',
  },
  scoreValue: {fontSize: 24, fontWeight: '800', alignSelf: 'center'},
  banner: {height: 300, width: 300},
  bannerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  button: {
    backgroundColor: '#3C4F76',
    padding: 16,
    paddingHorizontal: 36,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
    alignSelf: 'center',
  },
  buttonText: {fontSize: 18, fontWeight: '600', color: 'white'},
});
