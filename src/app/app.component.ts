import { Component } from '@angular/core';
import {DataTableModule,SharedModule} from 'primeng/primeng';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 cars1 = [{"vin":12,"year":121,"brand":313,"color":3232},
 {"vin":12,"year":121,"brand":314,"color":3232},
 {"vin":12,"year":121,"brand":314,"color":3232},
 {"vin":12,"year":121,"brand":315,"color":3232},
 {"vin":12,"year":121,"brand":315,"color":3232}
];
}
