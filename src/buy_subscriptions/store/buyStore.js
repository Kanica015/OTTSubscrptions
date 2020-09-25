import {action, observable} from 'mobx';

import apiService from './../../../my-app/service/buyAndSellServices'

class buyStore {

    @observable buyData;
    @observable ottName;
    @observable startDate;
    @observable endDate;
    @observable subscriptionsData;
    @observable packageList;
    @observable isFetchingReports;

    constructor() {
        this.buyData = null;
        this.ottName = null;
        this.startDate = null;
        this.endDate = null;
        this.subscriptionsData = null;
        this.packageList = [];
        this.isFetchingReports = false;
    }

    @action.bound
    saveSubscriptionValue(days, connectionName, numberOfConnections, startDate, endDate){
        this.subscriptionsData = {
            days : days,
            connectionName : connectionName,
            numberOfConnections : numberOfConnections,
            startDate : startDate,
            endDate : endDate
        }
    }

    async fetchByOttStartAndEndDate(ottName, startDate, endDate){
        this.isFetchingReports = true;
        let apiResponse = null;
        let packageId = this.convertOttToPackageId(ottName);
        let fetchPackageList = await apiService.fetchAllPackageList(packageId, startDate, endDate);

        if (fetchPackageList){
            this.packageList = this.packageList.concat(fetchPackageList);
            this.isFetchingReports = false;
        }
    }

    convertOttToPackageId = (ottName) => {
        switch (ottName) {
            case 'netflix':
                return 1;
                break;
            case 'sonyLiv':
                return 2;
                break;
            case 'zee5':
                return 3;
                break;
            case 'hotstar':
                return 4;
                break;
            case 'amazonPrime':
                return 5;
                break;
            default:
                return -1;
                break;

        }
    }
}

export default new buyStore();