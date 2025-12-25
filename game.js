const state = {
  obsession: 1,
  calm: 1,
  clarity: 0,
  location: "start"
};

const scenes = {
  start: {
    text: "You are missing a sock. This should not matter. It does.",
    choices: [
      {
        text: "Check the laundry room",
        effects: { obsession: 1, clarity: 1 },
        next: "laundry"
      },
      {
        text: "Ignore it and sit down",
        effects: { calm: 2 },
        next: "acceptance"
      }
    ]
  },

  laundry: {
    text: "The washing machine hums like it knows something.",
    choices: [
      {
        text: "Open the machine",
        effects: { obsession: 1 },
        next: "start"
      },
      {
        text: "Step away",
        effects: { calm: 1 },
        next: "acceptance"
      }
    ]
  },

  acceptance: {
    text: "You breathe. The sock is still gone.",
    choices: []
  }
};

function render() {
  const scene = scenes[state.location];

  document.getElementById("story").innerText = scene.text;
  document.getElementById("obsession").innerText = state.obsession;
  document.getElementById("calm").innerText = state.calm;
  document.getElementById("clarity").innerText = state.clarity;

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  scene.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.innerText = choice.text;
    btn.onclick = () => choose(choice);
    choicesDiv.appendChild(btn);
  });
}

function choose(choice) {
  for (let key in choice.effects) {
    state[key] += choice.effects[key];
  }
  state.location = choice.next;
  render();
}

render();
