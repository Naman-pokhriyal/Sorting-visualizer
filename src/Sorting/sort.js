import React, { Component } from "react";
import Bar from "./components/bar";
import "./sort.css";
// Icons
import { BsPlayCircle } from "react-icons/bs";
import { BiReset, BiSkipPrevious, BiSkipNext } from "react-icons/bi";
// Algo
import {
  bs as BubbleSort,
  ss as SelectionSort,
  is as InsertionSort,
  qs as QuickSort,
} from "./algorithms/sortingAlgo";

export default class sort extends Component {
  state = {
    original: [],
    array: [],
    arraySteps: [],
    colorKey: [],
    colorSteps: [],
    currentStep: 0,
    count: 10,
    delay: 500,
    algorithm: "Bubble Sort",
    timeouts: [],
  };

  ALGORITHMS = {
    "Bubble Sort": BubbleSort,
    "Selection Sort": SelectionSort,
    "Insertion Sort": InsertionSort,
    "Quick Sort": QuickSort,
  };

  componentDidMount() {
    this.generateRandomArray();
  }
  // Clear
  clearColorKey = () => {
    let blankKey = new Array(this.state.count).fill(0);
    this.setState({ colorKey: blankKey, colorSteps: [blankKey] });
  };

  clearTimeouts = () => {
    this.state.timeouts.forEach((time) => clearTimeout(time));
    this.setState({ timeouts: [] });
  };

  // Generate
  generateSteps = () => {
    let array = this.state.array.slice();
    let steps = this.state.arraySteps.slice();
    let colorSteps = this.state.colorSteps.slice();
    this.ALGORITHMS[this.state.algorithm](array, steps, colorSteps);
    this.setState({ arraySteps: steps, colorSteps });
  };

  generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  generateRandomArray = () => {
    this.clearColorKey();
    this.clearTimeouts();
    const count = this.state.count;
    const temp = [];

    for (let i = 0; i < count; i++) {
      temp.push(this.generateRandomNumber(50, 200));
    }
    this.setState(
      { original: temp, array: temp, arraySteps: [temp], currentStep: 0 },
      () => {
        this.generateSteps();
      }
    );
  };

  algoChange = (e) => {
    this.setState({ algorithm: e.target.value });
    this.generateRandomArray();
  };
  // Button Function

  previousStep = () => {
    let currentStep = this.state.currentStep;
    if (currentStep <= 0) return;
    currentStep = currentStep - 1;
    this.setState({
      array: this.state.arraySteps[currentStep],
      colorKey: this.state.colorSteps[currentStep],
      currentStep,
    });
  };
  nextStep = () => {
    let currentStep = this.state.currentStep;
    if (currentStep >= this.state.arraySteps.length - 1) return;
    currentStep = currentStep + 1;
    this.setState({
      array: this.state.arraySteps[currentStep],
      colorKey: this.state.colorSteps[currentStep],
      currentStep,
    });
  };

  start = async () => {
    let steps = this.state.arraySteps;
    let colorSteps = this.state.colorSteps;

    let timeouts = [];
    let i = 0;

    while (i < steps.length - this.state.currentStep) {
      let timeout = setTimeout(() => {
        let currentStep = this.state.currentStep;
        this.setState({
          array: steps[currentStep],
          colorKey: colorSteps[currentStep],
          currentStep: currentStep + 1,
        });
        timeouts.push(timeout);
      }, this.state.delay * i);
      i++;
      this.setState({ timeouts });
    }
  };

  render() {
    let bars = this.state.array.map((item, idx) => (
      <Bar key={idx} length={item} color={this.state.colorKey[idx]} />
    ));

    let playButton;
    if (this.state.arraySteps.length === this.state.currentStep) {
      playButton = (
        <button className="controller">
          <BiReset size="20px" onClick={this.generateRandomArray} />
        </button>
      );
    } else {
      playButton = (
        <button className="controller">
          <BsPlayCircle size="20px" onClick={this.start} />
        </button>
      );
    }

    return (
      <div className="sort-container">
        <div className="options">
          <div className="delayWrap">
            <label for="delay">Delay</label>
            <input
              type="range"
              min="100"
              max="1000"
              value={this.state.delay}
              class="slider"
              id="delay"
              onChange={(e) => {
                this.setState({ delay: e.target.value });
              }}
            />
          </div>
          <select name="algo" id="algo" onChange={this.algoChange}>
            <option value="Bubble Sort">Bubble Sort</option>
            <option value="Selection Sort">Selection Sort</option>
            <option value="Insertion Sort">Insertion Sort</option>
            <option value="Quick Sort">Quick Sort</option>
          </select>
        </div>
        <div className="frame">
          <div className="bars-container">{bars}</div>
        </div>
        <div className="control-panel">
          <div className="controller-buttons">
            <button className="controller">
              <BiSkipPrevious size="20px" onClick={this.previousStep} />
            </button>
            {playButton}
            <button className="controller">
              <BiSkipNext size="20px" onClick={this.nextStep} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
