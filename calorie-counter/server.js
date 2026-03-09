const express = require("express");
const app = express();

app.use(express.static(__dirname));
app.use(express.json());

app.post("/api/calculate", (req, res) => {
  let { height, weight, age, gender, goal, activity } = req.body;

  height = Number(height);
  weight = Number(weight);
  age = Number(age);

  let bmr =
    gender === "male"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

  const activityLevel = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
  };

  let maintenance = bmr * activityLevel[activity];

  let calories = maintenance;

  if (goal === "lose") calories -= 500;
  if (goal === "bulk") calories += 400;
  if (goal === "recomp") calories -= 200;

  res.json({
    maintenance: Math.round(maintenance),
    recommended: Math.round(calories),
  });
});

app.listen(3000, () => {
  console.log("Server running http://localhost:3000");
});
