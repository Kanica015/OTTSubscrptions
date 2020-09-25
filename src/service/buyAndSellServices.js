import React from 'react';
import axios from 'axios';

class buyAndSellServices {

    /**
     * Generates report by POST /migrationReport
     * @param {object} request
     * @returns {variable} Report ID
     */
    async generateSellingRequest(request){
        var apiResponse;

        const url = "http://localhost:8081/panchtantra/v1/inventory";

        var data = JSON.stringify(request);


        await axios.post(url, data,{headers: {"Content-Type": 'application/json'}})
            .then((response) => {
                console.log("success");
                apiResponse = response.data
                alert("successfully created request");
            })
            .catch((error) => {
                alert(error);
                console.log("catch");
            });
        console.log("we");
        return apiResponse;
    };


    async showPackages(request){
        var apiResponse;

        const url = "http://localhost:8081/panchtantra/v1/ott/1/packages";

        await axios.get(url,{headers: {"Content-Type": 'application/json'}})
            .then((response) => {
                apiResponse = response.data
            })
            .catch((error) => {
                alert(error);
            });
        return apiResponse;
    }

    async fetchAllPackageList(packageId,startDate, endDate){
        let url = "http://localhost:8081/panchtantra/v1/inventory?packageId=1&startDate=01/09/2020&endDate=30/09/2020";
        let apiResponse = null;
        let params = {
            packageId : 1,
            startDate : "01/01/2020",
            endDate : "12/12/2020"
        };
        await axios.get(url, {headers: {'Content-Type': 'application/json'}})
            .then((response) => {
                apiResponse = response.data
            })
            .catch((error) => {
                apiResponse = this.errorHandle(error)
            });
        return apiResponse;
    }


}

export default new buyAndSellServices();