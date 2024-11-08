import React, { useState } from "react";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CollapsableTvSingl from "./CollapsableTvSingl";

const ResultsCollapsableTv = (props) => {

    const [open, setOpen] = useState(false);

    console.log("iz collapsa props", props.idNumber)

    return (
        <>
            <tr>
                <td colSpan={3}>
                    <IconButton
                        aria-label='expand row'
                        size='small'
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton> Cast
                </td>
            </tr>
            <tr>
                <td colSpan={3}>
                    <Collapse in={open} timeout='auto' unmountOnExit>
                        <Box sx={{ margin: 0 }}>
                            <CollapsableTvSingl
                                idSeries={props.idNumber}
                            />
                        </Box>
                    </Collapse>
                </td>
            </tr>
        </>
    )

}
export default ResultsCollapsableTv;


