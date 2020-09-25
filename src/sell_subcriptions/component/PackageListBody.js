import React from 'react';
import {TBody, TD, TR} from "@react/react-spectrum/Table";

class PackageListBody extends React.Component {

    render() {
        return (
            <div>
                <TBody>
                    {this.props.packageList.map((row, idx) => <PackageListRow row={row} idx={idx} key={'ReportsTableRow'+idx}/>)}
                </TBody>
            </div>
        );
    }
}

const PackageListRow = (props) => {
    const row = props.row.package;
    if (row) {
        return (
            <TR key={props.idx}>
                <TD divider key={props.idx + 'ID'}
                    className="manage-reports-table-datacell">{row.packageId}</TD>
                <TD divider key={props.idx + 'NAME'} className="manage-reports-table-datacell">{row.name}</TD>
                <TD divider key={props.idx + 'SEATS'}
                    className="manage-reports-table-datacell">{row.noOfSeats}</TD>
                <TD divider key={props.idx + 'BASIS'} className="manage-reports-table-datacell">{row.basis}</TD>
                <TD divider key={props.idx + 'PRICE'} className="manage-reports-table-datacell">{row.pricing}</TD>
                <TD divider key={props.idx + 'STATUS'} className="manage-reports-table-datacell">{row.status}</TD>
            </TR>
        )
    }else {
        return (
            <div/>
        )
    }
}

export default PackageListBody;