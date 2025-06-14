/* eslint-disable prettier/prettier */
// https://lokalise.com/blog/emberjs-i18n-a-beginners-guide/

import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

//import writeXlsxFile from 'write-excel-file'

const cookieOptionsClassroom1 = { sameSite: 'none', secure: true, path: 'classroom1' };

const dataColumns =
  [
    {
      "label": "Číslo poradce",
      "fieldName": "brokerId",
      "type": "text"
    },
    {
      "label": "Prošlo uzávěrkou",
      "fieldName": "financialCloseName",
      "type": "text"
    },
    {
      "label": "Od",
      "fieldName": "dateFrom",
      "type": "date",
      "sortable": true
    },
    {
      "label": "Do",
      "fieldName": "dateTo",
      "type": "date",
      "sortable": true
    },
    {
      "label": "Celkem bodů",
      "fieldName": "points",
      "type": "number",
      "typeAttributes":
      {
        "maximumFractionDigits": 2
      },
      "cellAttributes":
      {
        "alignment": "left",
        "class":
        {
          "fieldName": "pointsClass"
        }
      },
      "sortable": true
    },
    {
      "label": "",
      "type": "button",
      "initialWidth": 15,
      "typeAttributes":
      {
        "iconName": "standard:search",
        "variant": "base",
        "iconPosition": "left",
        "label": "",
        "name": "show_detail",
        "title": "Detailní náhled",
        "disabled":
        {
          "fieldName": "noDetail"
        }
      }
    },
    {
      "label": "",
      "type": "button",
      "initialWidth": 15,
      "typeAttributes":
      {
        "iconName": "doctype:excel",
        "variant": "base",
        "iconPosition": "left",
        "label": "",
        "name": "xls_export",
        "title": "Export Excel",
        "disabled":
        {
          "fieldName": "noDetail"
        }
      }
    }];

const jsonRecordsData =
  [
    {
      "brokerId": "4",
      "dateFrom": "2023-11-01",
      "dateTo": "2023-11-15",
      "financialClose": "a0KP7000008s5mrMAA",
      "financialCloseName": "FC-000172",
      "id": "a0bP7000006xYWjIAM",
      "isInitial": false,
      "points": "0.5454545454545454"
    },
    {
      "brokerId": "4",
      "dateFrom": "2023-05-01",
      "dateTo": "2023-05-16",
      "financialClose": "a0KP7000008s5mRMAQ",
      "financialCloseName": "FC-000146",
      "id": "a0bP7000006xXNvIAM",
      "isInitial": false,
      "points": "0.4278909090909091"
    },
    {
      "brokerId": "4",
      "dateFrom": "2023-05-01",
      "dateTo": "2023-05-16",
      "financialClose": "a0KP7000008s5mRMAQ",
      "financialCloseName": "FC-000146",
      "id": "a0bP7000006xXNwIAM",
      "isInitial": false,
      "points": "-0.3644545454545454",
      "pointsClass": "slds-text-color_destructive"
    },
    {
      "brokerId": "4",
      "dateFrom": "2023-02-01",
      "dateTo": "2023-02-15",
      "financialClose": "a0KP7000008ryW4MAI",
      "financialCloseName": "FC-000123",
      "id": "a0bP7000006xY24IAE",
      "isInitial": false,
      "points": 3.08
    }]
  ;

const dataColumnsDetail =
  [
    {
      "label": "Smlouva",
      "fieldName": "linkAgreementName",
      "type": "url",
      "typeAttributes":
      {
        "label":
        {
          "fieldName": "agreementName"
        },
        "target": "_blank"
      }
    },
    {
      "label": "Číslo smlouvy",
      "fieldName": "agreementNumber",
      "type": "text"
    },
    {
      "label": "Datum uzavření",
      "fieldName": "closingDate",
      "type": "date"
    },
    {
      "label": "Jméno klienta",
      "fieldName": "linkCustomerName",
      "type": "url",
      "typeAttributes":
      {
        "label":
        {
          "fieldName": "customerName"
        },
        "target": "_blank"
      }
    },
    {
      "label": "Kód produktu",
      "fieldName": "productCode",
      "type": "text"
    },
    {
      "label": "Počet bodů",
      "fieldName": "points",
      "type": "number",
      "typeAttributes":
      {
        "minimumFractionDigits": 0,
        "maximumFractionDigits": 2
      },
      "cellAttributes":
      {
        "alignment": "left",
        "class":
        {
          "fieldName": "pointsTypeClass"
        }
      }
    }];

const jsonRecordsDataDetail =
  [
    {
      "agreementId": "a0QP7000008MPj9MAG",
      "agreementName": "CON-0535393",
      "closingDate": "2022-04-03",
      "customerId": "001P7000008DSOZIA4",
      "customerName": "Jozef Viskup",
      "id": "a0MP7000005CgW8MAK",
      "points": -1.8314578125,
      "productCode": "CSOB_AUTO",
      "linkCustomerName": "/chytry-honza.my.site.com/s/account/001P7000008DSOZIA4",
      "linkAgreementName": "/chytry-honza.my.site.com/s/agreement/a0QP7000008MPj9MAG",
      "pointsTypeClass": "slds-text-color_destructive"
    },
    {
      "agreementId": "a0QP7000008MSsKMAW",
      "agreementName": "CON-0538992",
      "closingDate": "2023-06-07",
      "customerId": "001P7000008DqM5IAK",
      "customerName": "Lukáš Klepek",
      "id": "a0MP7000005Cg6rMAC",
      "points": "-0.5475873015873015",
      "productCode": "UNQ_AUTO",
      "linkCustomerName": "/chytry-honza.my.site.com/s/account/001P7000008DqM5IAK",
      "linkAgreementName": "/chytry-honza.my.site.com/s/agreement/a0QP7000008MSsKMAW",
      "pointsTypeClass": "slds-text-color_destructive"
    },
    {
      "agreementId": "a0QP7000008MR2BMAW",
      "agreementName": "CON-0540704",
      "closingDate": "2022-08-01",
      "customerId": "001P7000008E4VWIA0",
      "customerName": "Tomáš Průša",
      "id": "a0MP7000005CrHKMA0",
      "points": "-0.16893562499999998",
      "productCode": "ALL_AUTO",
      "linkCustomerName": "/chytry-honza.my.site.com/s/account/001P7000008E4VWIA0",
      "linkAgreementName": "/chytry-honza.my.site.com/s/agreement/a0QP7000008MR2BMAW",
      "pointsTypeClass": "slds-text-color_destructive"
    },
    {
      "agreementId": "a0QP7000008MBHfMAO",
      "agreementName": "CON-0541611",
      "closingDate": "2022-11-25",
      "customerId": "001P7000008DslSIAS",
      "customerName": "Michal Judas",
      "id": "a0MP7000005CwS6MAK",
      "points": -1.397750625,
      "productCode": "ALL_AUTO",
      "linkCustomerName": "/chytry-honza.my.site.com/s/account/001P7000008DslSIAS",
      "linkAgreementName": "/chytry-honza.my.site.com/s/agreement/a0QP7000008MBHfMAO",
      "pointsTypeClass": "slds-text-color_destructive"
    },
    {
      "agreementId": "a0QP7000008PpT8MAK",
      "agreementName": "CON-0854038",
      "customerId": "001P7000008EPFFIA4",
      "customerName": "Bogdan Jakubek",
      "id": "a0MP7000005DJw3MAG",
      "points": "-4.4849749999999995",
      "productCode": "GČP_ZAMZAM",
      "linkCustomerName": "/chytry-honza.my.site.com/s/account/001 P7000008EPFFIA4",
      "linkAgreementName": "/chytry-honza.my.site.com/s/agreement/a0QP7000008PpT8MAK",
      "pointsTypeClass": "slds-text-color_destructive"
    }]
  ;

export default class ApplicationController extends Controller {

  @service router;
  @service intl;
  @service cookies;
  @service teacher;

  selectedBasicTab = 0;

  constructor() {
    super(...arguments);
    //console.log('started....');
    //this.excel();
    this.excelExport(dataColumnsDetail, jsonRecordsDataDetail, 0, 'points');
    //this.excelExport(dataColumns, jsonRecordsData, 2, 'points');
  }


  @action changeLocale(locale) {
    this.cookies.write('configLocale', locale, cookieOptionsClassroom1);
    return this.intl.set('locale', locale);
  }

  @action stats() {
    this.router.transitionTo('stats');
  }


  async excel() {
    const csvIterativeData = `
"Smlouva","Číslo smlouvy","Datum uzavření","Jméno klienta","Kód produktu","Počet bodů"
"CON-0535393","11","2022-04-03","Jozef Viskup","CSOB_AUTO","-1.8314578125"
"CON-0538992","22","2023-06-07","Lukáš Klepek","UNQ_AUTO","-0.5475873015873015"
"CON-0540704","33","2022-08-01","Tomáš Průša","ALL_AUTO","-0.16893562499999998"
"CON-0541611","44","2022-11-25","Michal Judas","ALL_AUTO","-1.397750625"
"CON-0854038","55","","Bogdan Jakubek","GČP_ZAMZAM","-4.4849749999999995"
    `;

    const data = [];
    var lines = csvIterativeData.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].split('"').join('').split(',');
      if (line.length === 6) {
        data.push(line);
      }
    }
    console.log(data);

    /*
    const data = [
      ["Smlouva", "Číslo smlouvy", "Datum uzavření", "Jméno klienta", "Kód produktu", "Počet bodů"],
      ["CON-0535393", "11", "2022-04-03", "Jozef Viskup", "CSOB_AUTO", "-1.8314578125"],
      ["CON-0538992", "22", "2023-06-07", "Lukáš Klepek", "UNQ_AUTO", "-0.5475873015873015"],
      ["CON-0540704", "33", "2022-08-01", "Tomáš Průša", "ALL_AUTO", "-0.16893562499999998"],
      ["CON-0541611", "44", "2022-11-25", "Michal Judas", "ALL_AUTO", "-1.397750625"],
      ["CON-0854038", "55", "", "Bogdan Jakubek", "GČP_ZAMZAM", "-4.4849749999999995"],
    ]
    console.log('csvIterativeData', csvIterativeData);
    */

    let objects = [];
    for (let i = 1; i < data.length; i++) {
      objects.push(
        {
          contract: data[i][0],
          contractNo: data[i][1],
          closed: data[i][2],
          clientName: data[i][3],
          productCode: data[i][4],
          points: data[i][5],
        }
      );
    }
    console.log('objects', objects);

    const schema = [
      { column: 'Smlouva', type: String, value: row => row.contract },
      { column: 'Číslo smlouvy', type: String, value: row => row.contractNo },
      { column: 'Datum uzavření', type: Date, format: 'dd/MM/yyyy', value: row => row.closed },
      { column: 'Jméno klienta', type: String, value: row => row.clientName },
      { column: 'Kód produktu', type: String, value: row => row.productCode },
      { column: 'Počet bodů', type: String, value: row => row.points }
    ]
    console.log('schema', schema);

    console.log('done');

  }

  excelExport(columns, records, removeFields, sumField) {

    let jsonKeys = [];
    let columnHeader = [];
    let data = [];

    for (let i = 0; i < columns.length - removeFields; i++) { // ignore last fields with rowaction to Excel
      try {
        jsonKeys[i] = columns[i].fieldName;
        if (jsonKeys[i].startsWith("link")) { // URL links are converted to fieldName, prefix link is removed
          jsonKeys[i] = jsonKeys[i].substring(4, 5).toLowerCase() + jsonKeys[i].slice(5);
        }
        columnHeader[i] = { value: columns[i].label };
      } catch (error) {
        console.log('i::', i, jsonKeys[i], error);
      }
    }
    data.push(columnHeader);

    //console.log('jsonKeys', jsonKeys);
    //console.log('columnHeader', columnHeader);

    let sumPoints = 0;
    for (let i = 0; i < records.length; i++) { // ignore last fields with rowaction to Excel
      for (let iteratorObj in jsonKeys) {
        let dataKey = jsonKeys[iteratorObj];
        if (records[i][dataKey] !== null && records[i][dataKey] !== undefined) {
          records[i][dataKey];
        }
      }
      let row = records[i];
      if (row[sumField]) {
        const value = String(row[sumField]).replaceAll('\'', '').replaceAll('"', '');
        if (!isNaN(value)) {
          sumPoints += Number(row[sumField]);
        }
      }
      let line = [];
      for (let j = 0; j < jsonKeys.length; j++) {
        let foundKey = false;
        Object.keys(row).forEach(function (key) {
          if (key == jsonKeys[j]) {
            line.push({ type: String, value: row[key] })
            foundKey = true;
          }
        });
        if (!foundKey) {
          line.push({ type: String, value: '' })
        }
      }
      data.push(line);
    }
    console.log('final data:', data);
    console.log('sumPoints', sumPoints.toFixed(2));

    let line = []
    for (let k = 0; k < jsonKeys.length - 1; k++) {
      line.push({ type: String, value: '' })
    }
    line.push({ type: String, value: 'Celkem: ' + sumPoints.toFixed(2) })
    data.push(line);
  }
}
