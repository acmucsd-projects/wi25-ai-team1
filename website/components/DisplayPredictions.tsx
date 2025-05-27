import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

interface PredictionResult {
  team1: string;
  team2: string;
  predicted_winner: string;
  confidence: number;
}

export default function MatchPredictor() {
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [result, setResult] = useState<PredictionResult | null>(null);

  const predict = () => {
    console.log("Predict button clicked");
    fetch("http://172.20.10.4:5001/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ team1, team2 }),
    })
      .then((res) => res.json())
      .then((data: PredictionResult) => setResult(data))
      .catch((err) => console.error("Error:", err));
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Team 1:</Text>
      <TextInput
        value={team1}
        onChangeText={setTeam1}
        placeholder="Long Beach St."
      />
      <Text>Team 2:</Text>
      <TextInput
        value={team2}
        onChangeText={setTeam2}
        placeholder="UC San Diego"
      />
      <Button title="Predict Winner" onPress={predict} />
      {result && (
        <View style={{ marginTop: 20 }}>
          <Text>Predicted Winner: {result.predicted_winner}</Text>
          <Text>Confidence: {(result.confidence * 100).toFixed(1)}%</Text>
        </View>
      )}
    </View>
  );
}
