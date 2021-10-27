class AdditiveSynth {
  constructor(){
    this.init()

  }

  init() {

     window.AudioContext = window.AudioContext||window.webkitAudioContext;
     this.audioCtx = new AudioContext();
     this.osc1 = this.audioCtx.createOscillator();
     this.osc2 = this.audioCtx.createOscillator();
     this.osc3 = this.audioCtx.createOscillator()

     this.masterGain = this.audioCtx.createGain();

     this.osc1.frequency.value = 440;
     this.osc2.frequency.value = 880;
     this.osc3.frequency.value  = 440;

     this.masterGain.gain.value = 0.01;


     this.osc1.connect(this.masterGain);
     this.osc2.connect(this.masterGain);
     this.osc3.connect(this.masterGain);

     this.masterGain.connect(this.audioCtx.destination);

     this.osc1.start();
     this.osc2.start();
     this.osc3.start();
    console.log('start')

    setTimeout( ()=> {
      this.osc1.stop();
      this.osc2.stop();
      this.osc3.stop();
    }, 1000);
     

  }

  update() {

  }
}

export {AdditiveSynth}