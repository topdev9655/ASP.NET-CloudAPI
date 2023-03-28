import React, { useMemo,useEffect, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import { darken } from '@mui/material';
import { Typography } from '@mui/material';
//nested data is ok, see accessorKeys in ColumnDef below
const Home = () => {
  const [tableData, setTableData] = useState([]);
  // Function to collect data
  const getApiData = async () => {
    const response = await fetch(
      "http://localhost:44487/products"
    ).then((response) => response.json());
     // console.log(response)
    // // update the state
    var tempdata=[...response];
    tempdata.map(data=>{
      data.unitPrice = data.unitPrice * 1.2
    });
     setTableData(tempdata);
  };
  useEffect(() => {
    getApiData();
  })
  const globalTheme = useTheme();
  const tableTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: globalTheme.palette.mode, //let's use the same dark/light mode as the global theme
          primary: globalTheme.palette.secondary, //swap in the secondary color as the primary for the table
          info: {
            main: 'rgb(255,122,0)', //add in a custom color for the toolbar alert background stuff
          },
          background: {
            default:
              globalTheme.palette.mode === 'light'
                ? 'rgb(254,255,244)' //random light yellow color for the background in light mode
                : '#000', //pure black table in dark mode for fun
          },
        },
        typography: {
          button: {
            textTransform: 'none', //customize typography styles for all buttons in table by default
            fontSize: '1.2rem',
          },
        },
        components: {
          MuiTooltip: {
            styleOverrides: {
              tooltip: {
                fontSize: '1.1rem', //override to make tooltip font size larger
              },
            },
          },
          MuiSwitch: {
            styleOverrides: {
              thumb: {
                color: 'pink', //change the color of the switch thumb in the columns show/hide menu to pink
              },
            },
          },
        },
      }),
    [globalTheme],
  );
//should be memoized or stable
const columns = useMemo(
  () => [
    {
      accessorKey: 'productId', //access nested data with dot notation
      header: 'ProductID',
      muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
    },
    {
      accessorKey: 'name',
      header: 'Name',
      muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
    },
    {
      accessorKey: 'description', //normal accessorKey
      header: 'Description',
      muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
    },
    {
      accessorKey: 'unitPrice',
      header: 'UnitPrice',
      muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
    },
    {
      accessorKey: 'maximumQuantity',
      header: 'MaximumQuantity',
      muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
    },
  ],
  [],
);

  const options = {
    filterType: 'checkbox',
  };
  return(     <ThemeProvider theme={tableTheme}>
    <MaterialReactTable
      columns={columns}
      data={tableData}
      muiTablePaperProps={{
        elevation: 0,
        sx: {
          borderRadius: '0',
          border: '1px dashed #e0e0e0',
        },
      }}
      muiTableBodyProps={{
        sx: (theme) => ({
          '& tr:nth-of-type(odd)': {
            backgroundColor: darken(theme.palette.background.default, 0.1),
          },
        }),
      }}
      renderTopToolbarCustomActions={() => (
        <Typography component="span" variant="h4">
          Products List
        </Typography>
      )}
    />
</ThemeProvider>);
}
export default Home;
