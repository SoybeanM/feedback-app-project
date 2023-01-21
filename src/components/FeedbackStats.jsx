
import { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'


function FeedbackStats() {
    const { feedback } = useContext(FeedbackContext)

    //calculate ratings average
    const getFeedbackRatingAverage = () => {
        let sum = 0;
        feedback.forEach((item) => {
            sum = sum + item.rating
        })
        const average = (sum / feedback.length).toFixed(1)

        return average
    }
    const average = getFeedbackRatingAverage()

    return (
        <div className='feedback-stats'>
            <h4>{feedback.length} Reviews </h4>
            <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
        </div>
    )
}

export default FeedbackStats
