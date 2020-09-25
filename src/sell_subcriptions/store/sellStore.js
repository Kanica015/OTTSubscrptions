import {decorate, observable,action} from 'mobx/lib/mobx';
import apiService from "../../service/buyAndSellServices";

class SellStore {
    sellData;
    email;
    accountNumber;
    ifscCode;
    startDate;
    endDate;
    packageList;
    ottName;
    selectedPackageId;

    constructor() {
        this.sellData = null;
        this.ottName = null;
        this.startDate = null;
        this.endDate = null;
        this.subscriptionsData = null;
        this.packageList = [];
        this.selectedPackageId=null;
    }

    async generateReport(userName,password,packageId){
        var request = {'ottUsername':userName,
        'ottPassword':password,
        'startDate':"01/09/2020",
        'endDate':"30/09/2020",
        'noOfSeats':1,
        'package':{
            'id':20
        },'seller':{
          'id':4001
        }};
        this.sellData = apiService.generateSellingRequest(request);
        return this.sellData;
    };

    setEmailAddress(emailAddress){
        this.email = emailAddress;
    }
    setStartDate(startDate){
        this.startDate = startDate;
    }
    setEndDate(endDate){
        this.endDate = endDate;
    }

    async showPackages(ott){
        let packageId = this.convertOttToPackageId(ott);
        let fetchPackageList = await apiService.fetchAllPackageList(packageId, this.startDate, this.endDate);

        if (fetchPackageList){
            this.packageList = fetchPackageList;
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
decorate(SellStore, {
    sellData: observable,
    current: observable,
    email:observable,
    generateReport: action,
    accountNumber:observable,
    ifscCode:observable,
    startDate:observable,
    endDate:observable,
    packageList:observable,
    selectedPackageId:observable
});

export default new SellStore();