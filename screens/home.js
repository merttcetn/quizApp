import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Title from '../components/title';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Title titleText="Quizzy" />
      <View style={styles.bannerContainer}>
        <Image
          source={require('../images/Choose-rafiki.png')}
          style={styles.banner}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Quiz')}
        style={styles.button}>
        <Text style={styles.buttonText}>Start</Text>
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
    width: '100%',
    backgroundColor: '#3C4F76',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  buttonText: {fontSize: 16, fontWeight: '600', color: 'white'},
});
