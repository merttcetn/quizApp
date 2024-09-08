import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Title from '../components/title';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Title titleText="Music Quiz 🎧" />
      <View style={styles.bannerContainer}>
        <Image
          source={require('../images/Choose-rafiki.png')}
          style={styles.banner}
          resizeMode="contain"
        />
        <View style={styles.description}>
          <Text style={styles.descriptionText}>
            Each correct answer adds 10 points!
          </Text>
          <Text style={styles.descriptionText}>
            Each wrong answer subtracts 5 points...
          </Text>
          <Text style={styles.descriptionText}>Good luck!</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Quiz')}
        style={styles.button}>
        <Text style={styles.buttonText}>START MUSIC QUIZ!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  banner: {height: 300, width: 300, borderRadius: 16},
  bannerContainer: {justifyContent: 'center', alignItems: 'center', flex: 1},
  container: {
    paddingTop: 40,
    paddingHorizontal: 16,
    height: '100%',
  },
  button: {
    backgroundColor: '#3C4F76',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
  },
  buttonText: {fontSize: 16, fontWeight: '600', color: 'white'},
  description: {
    justifyContent: 'center',
    alignItems: 'center', // Center text horizontally
    padding: 20, // Add padding for spacing
    flex: 0.5,
  },
  descriptionText: {
    padding: 5,
    fontSize: 16,
    textAlign: 'center', // Center text alignment
    fontWeight: '500',
  },
});
