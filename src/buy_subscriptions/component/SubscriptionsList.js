import React from 'react';
import buyStore from './../store/buyStore';
import SpinnerWithText from "../../../../common/components/SpinnerWithText";
import {Table, TH, THead} from "@react/react-spectrum/Table";
import {ShowAllPackageListTableHeaders} from "../constants/constants";
import {observer} from "mobx-react";
import PackageListBody from './PackageListBody';

@observer
class SubscriptionsList extends React.Component {

    componentDidMount() {
        buyStore.fetchByOttStartAndEndDate(this.props.ottName, this.props.startDate, this.props.endDate);
    }

    render() {

        if (!buyStore.packageList || buyStore.packageList.length == 0){
            if(buyStore.isFetchingReports)
                return <SpinnerWithText text={"Fetching existing package list ..."} />
            else
                return <label align='center'>No records found of migration reports.</label>
        } else
        return (
            <Table className="manage-reports-table">
                <THead>{ShowAllPackageListTableHeaders.map((header, idx) => <TH key={idx}>{header}</TH>)}</THead>
                <PackageListBody packageList={buyStore.packageList} />
            </Table>
        );
    }

}

export default SubscriptionsList;