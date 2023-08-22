import React from 'react';
import { Table } from 'antd';

const CalendarTable = () => {
  const daysInMonth = 31; // Tháng 8 có 31 ngày
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const columns = daysOfWeek.map(day => ({ title: day, dataIndex: day, key: day }));

  // Tạo dữ liệu cho bảng, mỗi hàng sẽ có các ngày của tuần tương ứng
  const data = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const row = { key: day };
    daysOfWeek.forEach(weekday => {
      row[weekday] = day <= daysInMonth ? '' : null;
      day++;
    });
    data.push(row);
  }

  return (
    <div className="calendar-table">
      <Table
        columns={columns}
        dataSource={data}
        pagination={false} // Tắt phân trang
        className="table"
      />
    </div>
  );
};

export default CalendarTable;
