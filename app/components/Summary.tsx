import ScoreBadge from './ScoreBadge';
import ScoreGauge from './ScoreGage'

const Category = ({ tile, score }: { tile: string, score: number }) => {
  const color = score > 70 ? 'text-green-600' : score > 50 ? 'text-yellow-400' : score > 30 ? 'text-orange-400' : 'text-red-400';




  return (
    <div className="resume-summary">
      <div className="category">
        <div className='flex flex-row gap-2 items-center justify-center'>
          <p className='text-2xl'>{tile}</p>
          <ScoreBadge score={score} />
        </div>
        <p className='text-2xl '>
          <span className={color}>{score}</span>
          /100
        </p>
      </div>
    </div>
  )
}

const Summary = ({ feedback }: { feedback: Feedback }) => {
  // console.log(feedback.ATS);


  return (
    <div className='bg-white rounded-2xl shadow-md w-full'>

      <div className="flex flex-row items-center p-4 gap-8">
        <ScoreGauge score={feedback.overallScore} />

        <div className="flex flex-col gap-2">
          <h2 className='text-2xl font-bold'>Your Resume Score</h2>
          <p className="text-sm to-gray-500">
            This Score is calculated based on the variables listed below.
          </p>
        </div>

      </div>

      <Category tile='Tone & Style' score={feedback.toneAndStyle.score} />
      <Category tile='Content' score={feedback.content.score} />
      <Category tile='Structure' score={feedback.structure.score} />
      <Category tile='Skills' score={feedback.skills.score} />

    </div>
  )
}

export default Summary