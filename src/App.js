import { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import './App.css';


function App() {
  const [message, setMessage] = useState('')
  const commands = [
    {
      command: ['Hello', 'Hi'],
      callback: ({ command }) => setMessage(`Hi there! You said: "${command}"`),
      matchInterim: true
    },
    {
      command: 'change color to *',
      callback: (color) => { document.getElementById('content').style.color = { color } }
    },
    {
      command: 'decrease text size',
      callback: () => { document.getElementById('content').style.fontSize = '16px' }
    },
    {
      command: 'increase text size',
      callback: () => { document.getElementById('content').style.fontSize = '22px' }
    },
    {
      command: 'open *',
      callback: (site) => window.open('http://' + site)
    },
    {
      command: 'reset',
      callback: ({ resetTranscript }) => resetTranscript()
    },
    {
      command: 'clear',
      callback: ({ resetTranscript }) => resetTranscript()
    }
  ];
  SpeechRecognition.startListening({ continuous: true, language: 'en-IN' })
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands })

  if (!browserSupportsSpeechRecognition) {
    return null
  }
  return (
    <div className="container">
      <div className="nav">
        <h2>Please speak something To write</h2>
      </div>
      <div id="content">
        {transcript}
      </div>
    </div>
  );
}

export default App;
