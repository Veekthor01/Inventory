import React from 'react';
import RecentActivity from '../../components/RecentActivity';
import styles from '../pages.module.css';

function ActivityHistoryPage() {
  // Function to handle the print button click and generate the PDF data
 const handlePrint = () => {
  window.print();
};
  // fetch and display activity history
  return (
    <div>
      <div className = "header"><h1>Activity History</h1></div>
      <RecentActivity />
      <button className={`${styles.button} ${styles.printButton}`} onClick={handlePrint}>Print PDF</button>
    </div>
  );
}

export default ActivityHistoryPage;