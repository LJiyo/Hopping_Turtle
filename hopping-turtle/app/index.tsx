// This is the simple login screen landing page

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'myname' && password === '1234') {
      router.push('/home'); // navigate to the home page with the map
    } else {
      alert('Invalid credentials'); // error message
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hopping Turtle Sign-In</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#91d3dfff',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 2,
    backgroundColor:'#99d18aff',
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
