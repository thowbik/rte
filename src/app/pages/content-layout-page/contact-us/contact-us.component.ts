import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  
  exportExcelData: any;

  public contact: any[] = [];
  cols: Array<{ 'field': string, 'header': string, 'widthstyle': string }> =
  [{ field: 'dist_name', header: 'Name of the District', widthstyle: '8em' }, { field: 'cell_number', header: 'Phone Number', widthstyle: '8em' }];
  constructor(public router : Router) { }

  ngOnInit() {
    this.contact = [
      {"dist_name":"Ariyalur","cell_number":"9787367485 , 9788858819"},
      {"dist_name":"Chennai","cell_number":"6379975083 , 9788858503"},
      {"dist_name":"Coimbatore","cell_number":"8825784727 , 9788858524"},
      {"dist_name":"Cuddalore","cell_number":"9788858557"},
      {"dist_name":"Dharmapuri","cell_number":"7598335558 , 9788858584"},

      {"dist_name":"Dindigul","cell_number":"9842621397 , 9788858602"},
      {"dist_name":"Erode","cell_number":"9944381214 , 9788858632"},
      {"dist_name":"Kancheepuram","cell_number":"9600436279 , 9788858659 , 8098635922"},
      {"dist_name":"Kanyakumari","cell_number":"9944095985 , 9788858683"},
      {"dist_name":"Karur","cell_number":"9486228903 , 9788858704"},

      {"dist_name":"Krishnagiri","cell_number":"9944223090 , 9788858721"},
      {"dist_name":"Madurai","cell_number":"9942430537 , 9788858742"},
      {"dist_name":"Nagapattinam","cell_number":"9976185912 , 9788858768"},
      {"dist_name":"Namakkal","cell_number":"9788313366 , 9788858790"},
      {"dist_name":"Perambalur","cell_number":"9786026745 , 9788858819"},

      {"dist_name":"Pudukkottai","cell_number":"9443097820 , 9788858841"},
      {"dist_name":"Ramanathapuram","cell_number":"9159369059 , 9788858867"},
      {"dist_name":"Salem","cell_number":"9489718463 , 9788858929"},
      {"dist_name":"Sivagangai","cell_number":"9486561665 , 9788858966"},
      {"dist_name":"Thanjavur","cell_number":"9944264026 , 9788858977"},

      {"dist_name":"The Nilgiris","cell_number":"9843925434 , 9786600110"},
      {"dist_name":"Theni","cell_number":"9095502721 , 9788859021 , 9788859014"},
      {"dist_name":"Thiruchirappalli","cell_number":"8610442736 , 9865995566"},
      {"dist_name":"Thirupur","cell_number":"9043044475 ,  9787838709 ,  8637467049"},
      {"dist_name":"Thirunelveli","cell_number":"8056213130 , 9788859062 , 7667814390"},

      {"dist_name":"Thiruvallur","cell_number":"9940142949 , 9788859509 , 7358455885"},
      {"dist_name":"Thiruvannamalai","cell_number":" 8838291121 , 9788859116"},
      {"dist_name":"Thiruvarur","cell_number":" 6381746033 , 9788859150"},
      {"dist_name":"Thoothukudi","cell_number":" 7598665100 , 9788859168"},
      {"dist_name":"Vellore","cell_number":"9159314493 ,  9789941863"},

      {"dist_name":"Villupuram","cell_number":"9942993825 ,  9629466010 ,  9751468777 ,  6369470739"},
      {"dist_name":"Virudhunagar","cell_number":"  8072490933 , 9788859231"}
  ];
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  getschoolmasterreport(){
    this.exportExcelData = [];
    this.contact.map(item => {
      return {
        'Name of the District': item.dist_name,
        'Phone Number': item.cell_number,
             }
         }).forEach(item => this.exportExcelData.push(item));
         let schoolmaster = [];
         for(let masterreport of this.exportExcelData) {
          schoolmaster.push(masterreport);
         }
         return schoolmaster;
   }

   exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.getschoolmasterreport());
        const workbook = { Sheets: { 'Contact List' : worksheet }, SheetNames: ['Contact List'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer,'Contact List');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + 'export' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

 
}
