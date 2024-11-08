import React, { useState } from "react";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import GuestCaracter from "./GuestCaracter";

const TableRow = (props) => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="collapse">
                Guest caracter
                <IconButton
                    color="primary"
                    aria-label='expand row'
                    size='small'
                    onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </div>
            <Collapse in={open} timeout='auto' unmountOnExit>
                <Box sx={{ margin: 0 }}>
                    <GuestCaracter
                        embedded={props?.embedded}
                    />
                </Box>
            </Collapse>
        </>
    );
};
export default TableRow;