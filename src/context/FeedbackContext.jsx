import { createContext, useState } from 'react'
import { v4 as uuid } from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: 'This item is feedback item 1',
            rating: 10
        },
        {
            id: 2,
            text: 'This item is feedback item 2',
            rating: 7
        },
        {
            id: 3,
            text: 'This item is feedback item 3',
            rating: 9
        }
    ])

    //edit feedback
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    //delete feedback
    const deleteFeedback = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    //add feedback
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuid()
        console.log('newFeedback', newFeedback)
        setFeedback([newFeedback, ...feedback]) //spread operator ...allows us to quickly copy all or part of an existing array or object into another array or object. 
    }

    // set item to be updated
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    //submit the updated feedback item
    const submitUpdatedFeedback = (id, updatedItem) => {
        setFeedback(
            feedback.map((item) => (item.id === id ? {
                ...item, ...updatedItem
            } : item))
        )

        setFeedbackEdit({
            item: {},
            edit: false
        })
    }

    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        submitUpdatedFeedback

    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext