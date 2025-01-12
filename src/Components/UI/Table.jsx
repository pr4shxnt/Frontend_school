import React from 'react';

export function Table({ columns, data }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse table-auto">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`border-b px-4 py-2 text-left text-sm font-medium text-gray-700 ${
                  column.width ? `w-${column.width}` : ''
                }`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="border-b px-4 py-2 text-sm text-gray-700"
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
