import React, { useState } from "react";
import { Table, Checkbox } from "antd";

const App = () => {
    const [data, setData] = useState(
        Array.from({ length: 5 }, (_, rowIndex) => {
            const row = { key: rowIndex.toString() };
            for (let colIndex = 0; colIndex < 5; colIndex++) {
                row[`col${colIndex}`] = { checked: false, rowspan: 1 };
            }
            return row;
        })
    );

    const handleCheckboxChange = (rowIndex, colIndex) => {
        const newData = [...data];
        const currentCell = newData[rowIndex][`col${colIndex}`];
        currentCell.checked = !currentCell.checked;

        if (colIndex < 4 && currentCell.checked) {
            newData[rowIndex][`col${colIndex + 1}`].rowspan = 0;
            newData[rowIndex][`col${colIndex}`].rowspan = 2;
        } else if (
            colIndex < 4 &&
            !newData[rowIndex][`col${colIndex + 1}`].checked
        ) {
            newData[rowIndex][`col${colIndex}`].rowspan = 1;
            newData[rowIndex][`col${colIndex + 1}`].rowspan = 1;
        }
        console.log(rowIndex, colIndex);

        setData(newData);
    };

    const columns = Array.from({ length: 5 }, (_, colIndex) => ({
        dataIndex: `col${colIndex}`,
        render: (_, record, rowIndex) => (
            <Checkbox
                checked={record[`col${colIndex}`].checked}
                onChange={() => handleCheckboxChange(rowIndex, colIndex)}
            />
        ),
    }));

    const CalendarTable = () => {
        const year = 2023;
        const month = 7; // Tháng 8 (đếm từ 0)
        const firstDayOfMonth = new Date(year, month, 1).getDay(); // Lấy ngày đầu tiên trong tháng
        const daysInMonth = new Date(year, month + 1, 0).getDate(); // Lấy số ngày trong tháng
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      
        const weeklyTables = [];
        let currentDate = 1;
        
        // Tạo các bảng tuần
        while (currentDate <= daysInMonth) {
          const columns = daysOfWeek.map((day, index) => {
            const dayOfMonth = currentDate + index - firstDayOfMonth;
            const date = new Date(year, month, dayOfMonth);
            if (dayOfMonth > 0 && dayOfMonth <= daysInMonth) {
              return {
                title: `${day} - ${date.getDate()}/${date.getMonth() + 1}`,
                dataIndex: `${day}${dayOfMonth}`,
                key: `${day}${dayOfMonth}`,
              };
            }
            return {
              title: day,
              dataIndex: `${day}${dayOfMonth}`,
              key: `${day}${dayOfMonth}`,
            };
          });
      
          const data = [{ key: currentDate }];
      
          // Tạo dữ liệu cho mỗi ô trong bảng
          for (let dayIndex = 0; dayIndex < daysOfWeek.length; dayIndex++) {
            const day = daysOfWeek[dayIndex];
            const dayOfMonth = currentDate + dayIndex - firstDayOfMonth;
            if (dayOfMonth > 0 && dayOfMonth <= daysInMonth) {
              data[0][`${day}${dayOfMonth}`] = dayOfMonth;
            } else {
              data[0][`${day}${dayOfMonth}`] = '';
            }
          }
      
          // Thêm bảng tuần vào danh sách các bảng tuần
          weeklyTables.push(
            <div key={currentDate} className="week-table">
              <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                className="table"
              />
            </div>
          );
      
          // Chuyển sang tuần tiếp theo
          currentDate += 7 - firstDayOfMonth;
        }
      
        return (
          <div className="calendar-table">
            {weeklyTables}
          </div>
        );
      };
      
      
    return (
        <>
            {/* <Table
      columns={columns}
      dataSource={data.map((row, rowIndex) => {
        const rowData = { ...row };
        for (let colIndex = 0; colIndex < 5; colIndex++) {
          rowData[`col${colIndex}`] = (
            <Checkbox
              checked={row[`col${colIndex}`].checked}
              onChange={() => handleCheckboxChange(rowIndex, colIndex)}
            />
          );
        }
        return rowData;
      })}
      pagination={false}
      bordered
    /> */}
            <CalendarTable />
        </>
    );
};

export default App;
