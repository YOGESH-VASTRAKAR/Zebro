import React from 'react';
import './DashboardDetails.css';

const DashboardDetails = () => {
  const orderData = {
    orderDate: "22-08-2022",
    paymentType: "Online - RazorPay",
    orderNo: "1615141312111009",
    txnId: "d0b855c2dd4f752c13d2",
    orderStatus: "Shipped",
    productDescription: "Colored Shaped Product Name and 1 other items",
    statusTimeline: [
      {
        date: "22-08-2022",
        status: "Processing",
        description: "Your order has being received."
      },
      {
        date: "22-08-2022",
        status: "Packed",
        description: "Your order has been packed and ready to be shipped."
      },
      {
        date: "22-08-2022",
        status: "Shipped",
        description: "Your order has been shipped. Your AWB No. 12345679890"
      }
    ]
  };

  return (
    <div className="dashboard-details-page">
      <div className="dashboard-details-content">
        <div className="dashboard-details-header">
          <h2 className="dashboard-details-title">Latest Order</h2>
          <div className="dashboard-order-status-badge">
            <span className={`dashboard-status-value ${orderData.orderStatus.toLowerCase()}`}>
              {orderData.orderStatus}
            </span>
          </div>
        </div>
        
        <div className="dashboard-order-info-grid">
          <div className="dashboard-order-info-card">
            <div className="dashboard-info-group">
              <label className="dashboard-info-label">Order Date</label>
              <span className="dashboard-info-value">{orderData.orderDate}</span>
            </div>
            <div className="dashboard-info-group">
              <label className="dashboard-info-label">Payment Type</label>
              <span className="dashboard-info-value">{orderData.paymentType}</span>
            </div>
          </div>
          
          <div className="dashboard-order-info-card">
            <div className="dashboard-info-group">
              <label className="dashboard-info-label">Order No</label>
              <span className="dashboard-info-value dashboard-order-number">{orderData.orderNo}</span>
            </div>
            <div className="dashboard-info-group">
              <label className="dashboard-info-label">Transaction ID</label>
              <span className="dashboard-info-value dashboard-txn-id">{orderData.txnId}</span>
            </div>
          </div>
        </div>
        
        <div className="dashboard-order-description-card">
          <h3 className="dashboard-product-description-title">Order Summary</h3>
          <p className="dashboard-product-description">{orderData.productDescription}</p>
        </div>
        
        <div className="dashboard-timeline-section">
          <h3 className="dashboard-timeline-title">Order Status Timeline</h3>
          <div className="dashboard-status-timeline">
            {orderData.statusTimeline.map((item, index) => (
              <div key={index} className="dashboard-timeline-item">
                <div className="dashboard-timeline-marker">
                  <div className="dashboard-timeline-dot"></div>
                  {index < orderData.statusTimeline.length - 1 && <div className="dashboard-timeline-line"></div>}
                </div>
                <div className="dashboard-timeline-content">
                  <div className="dashboard-timeline-date">{item.date}</div>
                  <div className="dashboard-timeline-status">
                    <span className="dashboard-status-badge">{item.status}</span>
                    <p className="dashboard-status-description">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDetails;