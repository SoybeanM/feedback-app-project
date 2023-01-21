import { FaQuestion } from 'react-icons/fa' // inside {} is a hook
import { Link } from 'react-router-dom'

function AboutIconLink() {
    return (
        <div className='about-link'>
            <Link to='/about'>
                <FaQuestion size={30} />
            </Link>
        </div>
    )
}

export default AboutIconLink