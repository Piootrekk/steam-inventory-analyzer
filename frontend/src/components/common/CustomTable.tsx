import React from "react";

type Column<T> = {
  header: string;
  accessor: (row: T) => React.ReactNode;
};

type CustomTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  footer?: React.ReactNode;
};

const CustomTable = <T,>({ data, columns, footer }: CustomTableProps<T>) => {
  return (
    <>
      {data.length > 0 ? (
        <table className="border border-gray-600 rounded-lg overflow-hidden bg-gray-800 w-2/3">
          <thead className="bg-gray-700 text-gray-100">
            <tr className="text-lg">
              {columns.map((column, index) => (
                <th key={index} className="px-4 py-2 border-b border-gray-600">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="text-center even:bg-gray-700 odd:bg-gray-800 text-gray-100"
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-2 border-b border-gray-600"
                  >
                    {column.accessor(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {footer && (
            <tfoot className="bg-gray-700 text-gray-100 text-lg">
              <tr>
                <td colSpan={columns.length}>{footer}</td>
              </tr>
            </tfoot>
          )}
        </table>
      ) : (
        <p className="text-center text-gray-500">No data available.</p>
      )}
    </>
  );
};

export default CustomTable;
