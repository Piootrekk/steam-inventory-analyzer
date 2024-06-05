import React, { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setFilteredData(
        data.filter((row) =>
          columns.some((column) =>
            column
              .accessor(row)!
              .toString()
              .toLowerCase()
              .includes(debouncedSearchTerm.toLowerCase())
          )
        )
      );
    } else {
      setFilteredData(data);
    }
  }, [debouncedSearchTerm, data, columns]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="w-2/3 mx-auto">
      <table className="border border-gray-900 rounded-lg overflow-hidden bg-gray-800 w-full">
        <thead className="bg-gray-700 text-gray-100">
          <tr>
            <th
              colSpan={columns.length}
              className="px-4 py-2 border-b border-gray-600"
            >
              <div className="flex justify-between items-center">
                <p>{""}</p>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="p-2 border rounded-lg bg-primary  text-gray-100 border-gray-600"
                />
              </div>
            </th>
          </tr>
          <tr className="text-lg">
            {columns.map((column, index) => (
              <th key={index} className="px-4 py-2 border-b border-gray-600">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="text-center bg-gray-700 text-gray-100 hover:bg-gray-600"
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
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center text-gray-500 px-4 py-2 bg-gray-700"
              >
                No data available.
              </td>
            </tr>
          )}
        </tbody>
        {footer && (
          <tfoot className="bg-gray-700 text-gray-100">
            <tr className="text-lg">
              <td className="px-4 py-2" colSpan={columns.length}>
                {footer}
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};

export default CustomTable;
