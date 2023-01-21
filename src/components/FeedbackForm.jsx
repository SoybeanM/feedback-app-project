import { useState, useContext, useEffect } from 'react'
import RatingSelect from './RatingSelect'
import Card from './shared/Card'
import Button from './shared/Button'
import FeedbackContext from "../context/FeedbackContext"

function FeedbackForm() {

    const [text, setText] = useState('')
    const [rating, setRating] = useState(10) //state lifting form RatingSelect.jsx
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [message, setMessage] = useState('')

    const { addFeedback, feedbackEdit, submitUpdatedFeedback } = useContext(FeedbackContext)

    useEffect(() => {
        if (feedbackEdit.edit === true) {
            setBtnDisabled(false)
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }

    }, [feedbackEdit])

    const handleReviewTextChange = (event) => {
        const textInput = event.target.value // textInput is what end user sees in UI
        if (textInput === '') {
            setBtnDisabled(true)
            setMessage(null)
        } else if (textInput !== '' && textInput.trim().length < 10) {
            setBtnDisabled(true)
            setMessage('Text must be at least 10 characters')
        } else {
            setBtnDisabled(false)
            setMessage(null)
        }
        setText(textInput);
    }

    const handleSubmit = (event) => {
        console.log('submit')
        event.preventDefault()
        if (text.trim().length > 10) {
            const newFeedback = {
                text,
                rating,
            }
            if (feedbackEdit.edit === true) {
                submitUpdatedFeedback(feedbackEdit.item.id, newFeedback)

            } else {
                addFeedback(newFeedback)
            }

            setText('')
        }

    }
    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <h2>Let us know how was your experience with us </h2>
                <RatingSelect rating={rating} setRating={setRating} />
                <div className='input-group'>
                    <input
                        onChange={handleReviewTextChange}
                        type='text'
                        placeholder='Write a review'
                        value={text}
                    />
                    <Button type='submit' isDisabled={btnDisabled}> Send </Button>
                </div>
                {message && <div className='message'>{message}</div>} {/*{message ? <div className='message'>{message}</div> : null */}
            </form>

        </Card>
    )
}

export default FeedbackForm