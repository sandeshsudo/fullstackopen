import {useState} from 'react'


function Statistics(props){

  const {good, neutral, bad} = props.value
  const total = good + neutral + bad
  const average = total/3;
  const positive = good*(100/total)

  if(total > 0){
    return(
    <>
      <StatisticsLine text="good" value={good}/>
      <StatisticsLine text="neutral" value={neutral}/>
      <StatisticsLine text="bad" value={bad}/>
      <StatisticsLine text="all" value={total}/>
      <StatisticsLine text="average" value={average}/>
      <StatisticsLine text="positive" value={positive + ' %'}/>
    </>  
    );
  }else{
    return(
      <p>No feedback given</p>
    );
  } 
}

function StatisticsLine({text,value}){
  return(
    <>
    <table>
      <tbody>
      <tr>
          <td colSpan={20}>{text}</td>
          <td>{value}</td>
        </tr>
      </tbody>
    </table>
    </>
  );
}

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

function App() {

  // const [good, setGood] = useState(0)
  // const [neutral, setNeutral] = useState(0)
  // const [bad, setBad] = useState(0)

  //Destructuring above code
  const [feedback, setFeedback] = useState({good:0,neutral:0,bad:0})

  const handleSetGood = () => setFeedback({...feedback, good:feedback.good + 1})
  const handleSetNeutral = () => setFeedback({...feedback, neutral:feedback.neutral + 1})
  const handleSetBad = () => setFeedback({...feedback, bad:feedback.bad + 1})

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleSetGood} text={"Good"} />
      <Button handleClick={handleSetNeutral} text={"Neutral"} />
      <Button handleClick={handleSetBad} text={"Bad"} />
      <h1>Statistics</h1>
      <Statistics value={{good:feedback.good,neutral:feedback.neutral,bad:feedback.bad}} />
    </div>
  );
}

export default App;
