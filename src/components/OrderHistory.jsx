import React from 'react';
import { 
  EyeIcon,
  PrinterIcon,
  TruckIcon,
  CheckCircleIcon,
  ClockIcon,
  CalendarIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import './OrderHistory.css';

const OrderHistory = () => {
  const orders = [
    {
      id: 1,
      date: "15/06/2022",
      orderId: "1615141312111009",
      status: "shipped",
      items: 3,
      total: "₹3,597.00",
      trackingNumber: "TRK123456789"
    },
    {
      id: 2,
      date: "12/03/2022",
      orderId: "1615141312110012",
      status: "delivered",
      items: 2,
      total: "₹2,299.00",
      trackingNumber: "TRK987654321"
    },
    {
      id: 3,
      date: "15/07/2021",
      orderId: "1615141312109032",
      status: "delivered",
      items: 1,
      total: "₹1,299.00",
      trackingNumber: "TRK456789123"
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'shipped':
        return <TruckIcon className="order-history-status-icon" />;
      case 'delivered':
        return <CheckCircleIcon className="order-history-status-icon" />;
      case 'processing':
        return <ClockIcon className="order-history-status-icon" />;
      default:
        return <ClockIcon className="order-history-status-icon" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'shipped':
        return 'Shipped';
      case 'delivered':
        return 'Delivered';
      case 'processing':
        return 'Processing';
      default:
        return status;
    }
  };

  const handleViewDetails = (orderId) => {
    console.log('View details for order:', orderId);
    // Add your details logic here
  };

  const handlePrintOrder = (orderId) => {
    console.log('Print order:', orderId);
    // Add your print logic here
  };

  return (
    <div className="order-history-page">
      <div className="order-history-content-section">
        <h3 className="order-history-content-title">Order History</h3>
        <div className="order-history-content-scrollable">
          <div className="order-history-container">
            {/* Header with Stats */}
            <div className="order-history-header">
              <div className="order-history-header-content">
                <div className="order-history-header-text">
                  <DocumentTextIcon className="order-history-header-icon" />
                  <div>
                    <p className="order-history-subtitle">
                      Track and manage your orders
                    </p>
                    <div className="order-history-stats">
                      <span className="order-history-stat-item">
                        <strong>{orders.length}</strong> orders total
                      </span>
                      <span className="order-history-stat-divider">•</span>
                      <span className="order-history-stat-item">
                        <strong>{orders.filter(o => o.status === 'delivered').length}</strong> delivered
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Orders Table */}
            <div className="order-history-table-container">
              <table className="order-history-table">
                <thead>
                  <tr>
                    <th className="order-history-table-header">
                      <div className="order-history-table-header-with-icon">
                        <CalendarIcon className="order-history-header-icon-small" />
                        Date
                      </div>
                    </th>
                    <th className="order-history-table-header">
                      <div className="order-history-table-header-with-icon">
                        <DocumentTextIcon className="order-history-header-icon-small" />
                        Order Details
                      </div>
                    </th>
                    <th className="order-history-table-header">
                      <div className="order-history-table-header-with-icon">
                        <TruckIcon className="order-history-header-icon-small" />
                        Status
                      </div>
                    </th>
                    <th className="order-history-table-header">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="order-history-row">
                      <td className="order-history-table-cell order-history-date-cell">
                        <div className="order-history-date-content">
                          <CalendarIcon className="order-history-cell-icon" />
                          <span>{order.date}</span>
                        </div>
                      </td>
                      <td className="order-history-table-cell order-history-details-cell">
                        <div className="order-history-details">
                          <div className="order-history-order-id">#{order.orderId}</div>
                          <div className="order-history-summary">
                            {order.items} item{order.items > 1 ? 's' : ''} • {order.total}
                          </div>
                          {order.trackingNumber && (
                            <div className="order-history-tracking-info">
                              Tracking: {order.trackingNumber}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="order-history-table-cell order-history-status-cell">
                        <div className={`order-history-status-badge ${order.status}`}>
                          {getStatusIcon(order.status)}
                          <span className="order-history-status-text">{getStatusText(order.status)}</span>
                        </div>
                      </td>
                      <td className="order-history-table-cell order-history-actions-cell">
                        <div className="order-history-action-buttons">
                          <button 
                            className="order-history-details-button"
                            onClick={() => handleViewDetails(order.id)}
                          >
                            <EyeIcon className="order-history-action-icon" />
                            DETAILS
                          </button>
                          <button 
                            className="order-history-print-button"
                            onClick={() => handlePrintOrder(order.id)}
                          >
                            <PrinterIcon className="order-history-action-icon" />
                            PRINT
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {orders.length === 0 && (
              <div className="order-history-empty">
                <DocumentTextIcon className="order-history-empty-icon" />
                <h3 className="order-history-empty-title">No Orders Yet</h3>
                <p className="order-history-empty-text">You haven't placed any orders yet.</p>
                <button className="order-history-shop-now-btn">
                  START SHOPPING
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;