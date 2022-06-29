import { useMemo } from "react";
import { useTable, useRowSelect } from "react-table";
import { AidPackages } from "../aidPackage";
import "./manageAidPackages.css";

export function AidPackageTable({
  aidPackages,
  setSelectedPackage,
}: {
  aidPackages: AidPackages;
  setSelectedPackage: (supplierID: number) => void;
}) {
  const data = useMemo(
    () =>
      Object.keys(aidPackages).map((key) => {
        let supplierID = Number(key);

        return {
          name: aidPackages[supplierID].name,
          supplier: supplierID,
          description: aidPackages[supplierID].details,
          period: null,
          totalCost: 0,
        };
      }),
    [aidPackages]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Supplier",
        accessor: "supplier",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "period",
        accessor: "period",
      },
      {
        Header: "Total Cost",
        accessor: "totalCost",
      },
    ],
    []
  );

  const tableInstance = useTable(
    // @ts-ignore
    { columns, data, autoResetSelectedRows: false },
    useRowSelect
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // @ts-ignore
    toggleAllRowsSelected,
  } = tableInstance;

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);

          return (
            <tr
              {...row.getRowProps()}
              onClick={() => {
                setSelectedPackage(row.original.supplier);
                toggleAllRowsSelected(false);
                // @ts-ignore
                row.toggleRowSelected(true);
              }}
            >
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      background:
                        // @ts-ignore
                        row.isSelected && "var(--elixir-color-primary)",
                    }}
                    className="manage-package-row"
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
