import React from 'react'

const ScoreBadge = ({score}: {score: number}) => {
    let badgeColor = '';
    let badgetext = '';
if(score <= 100 && score >= 90) {
    badgeColor = 'bg-green-600';
    badgetext = 'Excellent';
}
  else  if(score > 70) {
        badgeColor = 'bg-green-200';
        badgetext = 'Strong';
    }else if(score > 50) {
        badgeColor = 'bg-yellow-500';
        badgetext = 'Good Start';
    }else if(score > 30) {
        badgeColor = 'bg-orange-500';
        badgetext = 'Average';
    }else {
        badgeColor = 'bg-red-500';
        badgetext = 'Poor';
    } 

  return (
    <div className={`px-3 py-1 rounded-full ${badgeColor}`}>
        <p className='text-white text-sm font-medium'>{badgetext}</p>
    </div>
  )
}

export default ScoreBadge