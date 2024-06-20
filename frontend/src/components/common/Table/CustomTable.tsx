import React, { useEffect, useRef, useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import { FaChevronLeft, FaChevronRight, FaRegTrashAlt } from "react-icons/fa";

export type Column<T> = {
  header: string;
  accessor: (row: T) => React.ReactNode;
  editable: boolean;
  modifier?: (value: string) => any;
  key: keyof T;
};

type CustomTableProps<T> = {
  data: T[];
  setData: React.Dispatch<React.SetStateAction<T[]>>;
  columns: Column<T>[];
  footer?: React.ReactNode;
};

const CustomTable = <T,>({
  data,
  setData,
  columns,
  footer,
}: CustomTableProps<T>) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentCell, setCurrentCell] = useState<{
    rowId: number;
    colId: number;
  } | null>(null);
  const [currentValue, setCurrentValue] = useState("");

  const cellRef = useRef<HTMLInputElement>(null);

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
    setCurrentPage(1);
  }, [debouncedSearchTerm, data, columns]);

  const handleCellDoubleClick = (
    rowId: number,
    colId: number,
    value: string
  ) => {
    setCurrentCell({ rowId, colId });
    setCurrentValue(value);
  };

  const handleCellBlur = () => {
    if (currentCell) {
      const selectedRow = data[currentCell.rowId - 1];
      if (selectedRow) {
        const column = columns[currentCell.colId];
        const modifiedValue = column.modifier
          ? column.modifier(cellRef.current?.value ?? "")
          : cellRef.current?.value;

        const updatedRow = {
          ...selectedRow,
          [column.key]: modifiedValue,
        };

        const updatedData = data.map((row, index) =>
          index === currentCell.rowId - 1 ? updatedRow : row
        );

        setData(updatedData);
      }
    }
    setCurrentCell(null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const resetIds = (details: T[]): T[] => {
    return details.map((item, index) => ({
      ...item,
      id: index + 1,
    }));
  };

  const handleRemove = (id: number) => {
    const updatedData = data.filter((_, index) => index + 1 !== id);
    setData(resetIds(updatedData));
  };

  const itemsPerPageOptions = [10, 25, 50, 100, 200];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.max(Math.ceil(filteredData.length / itemsPerPage), 1);

  return (
    <table className="border border-gray-900 rounded-lg overflow-hidden bg-gray-800 w-full max-w-[1160px]">
      <thead className="bg-gray-700 text-gray-100">
        <tr>
          <th
            colSpan={columns.length + 1}
            className="px-4 py-2 border-b border-gray-600"
          >
            <div className="flex justify-end items-center">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="p-2 border rounded-lg bg-primary  text-gray-100 border-gray-600 h-10"
              />
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="p-2 border rounded-lg bg-primary text-gray-100 border-gray-600  h-10"
              >
                {itemsPerPageOptions.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </th>
        </tr>
        <tr className="text-lg">
          {columns.map((column, index) => (
            <th key={index} className="px-4 py-2 border-b border-gray-600">
              {column.header}
            </th>
          ))}
          <th className="px-4 py-2 border-b border-gray-600">Remove</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.length > 0 ? (
          currentItems.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="text-center bg-gray-700 text-gray-100 hover:bg-gray-600"
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="px-4 py-2 border-b border-gray-600"
                  onDoubleClick={() =>
                    column.editable &&
                    handleCellDoubleClick(
                      rowIndex + 1,
                      colIndex,
                      column.accessor(row) as string
                    )
                  }
                >
                  {column.editable &&
                  currentCell?.rowId === rowIndex + 1 &&
                  currentCell?.colId === colIndex ? (
                    <input
                      ref={cellRef}
                      defaultValue={currentValue}
                      onBlur={handleCellBlur}
                      className=" bg-gray-800 text-gray-100 p-1"
                      autoFocus
                    />
                  ) : (
                    column.accessor(row)
                  )}
                </td>
              ))}
              <td className="px-4 py-2 border-b border-gray-600">
                <button
                  className="text-red-500"
                  onClick={() => handleRemove(rowIndex + 1)}
                >
                  <FaRegTrashAlt size={24} className="self-center" />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={columns.length + 1}
              className="text-center text-gray-500 px-4 py-2 bg-gray-700"
            >
              No data available.
            </td>
          </tr>
        )}
      </tbody>
      <tfoot className="bg-gray-700 text-gray-100">
        {footer && (
          <tr className="text-lg">
            <td className="px-4 py-2" colSpan={columns.length + 1}>
              <div className="flex justify-end items-center">
                <div className="flex-1">{footer}</div>
                <span className="mr-2">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="mr-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaChevronLeft className="hover:text-gray-400" />
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="mr-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaChevronRight className="hover:text-gray-400" />
                </button>
              </div>
            </td>
          </tr>
        )}
      </tfoot>
    </table>
  );
};

export default CustomTable;
