import React from 'react'

function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer>
            <p>&copy; {year} Veekthor. All rights reserved.</p>
        </footer>
    )
}

export default Footer
