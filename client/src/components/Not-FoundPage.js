import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../pages/pages.module.css'

function NotFoundPage() {
    return (
        <div className={styles['not-found-container']}>
            <h1 className={styles['not-found-title']}>404 - Page Not Found</h1>
            <p className={styles['not-found-message']}>
                The item you are looking for does not exist.
            </p>
            <Link to="/" className={styles['go-back-link']}>
                Go back to Dashboard
            </Link>
        </div>
    )
}

export default NotFoundPage
